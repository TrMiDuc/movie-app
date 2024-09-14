const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/token');
const db = require('../utils/db');

exports.login = (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Database error' });
        }

        if (result.length > 0) {
            const user = result[0];

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).send({ message: 'Error during password comparison' });
                }

                if (isMatch) {
                    const token = generateToken(user.user_id, user.username);
                    
                    res.cookie('auth_token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'None',
                        maxAge: 3600 * 1000
                    });

                    res.send({ message: 'Login successful' });
                } else {
                    res.status(401).send({ message: 'Invalid username or password' });
                }
            });
        } else {
            res.status(401).send({ message: 'Invalid username or password' });
        }
    });
};

exports.signup = async (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Database error' });
        }

        if (result.length > 0) {
            return res.status(400).send({ message: 'Username already exists' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
            db.query(insertQuery, [username, hashedPassword], (err) => {
                if (err) {
                    return res.status(500).send({ message: 'Error inserting user into database' });
                }

                res.status(201).send({ message: 'User registered successfully', user: username });
            });
        } catch (error) {
            return res.status(500).send({ message: 'Error during password hashing' });
        }
    });
};
