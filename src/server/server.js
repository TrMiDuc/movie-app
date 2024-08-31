const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'your_password',
//     database: 'your_database'
// });

// db.connect((err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('MySQL connected...');
// });

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // const query = 'SELECT * FROM users WHERE username = ?';
    // db.query(query, [username], (err, result) => {
    //     if (err) {
    //         return res.status(500).send({ message: 'Database error' });
    //     }

    //     if (result.length > 0) {
    //         const user = result[0];

    //         // Compare the password with the hashed password in the database
    //         bcrypt.compare(password, user.password, (err, isMatch) => {
    //             if (err) {
    //                 return res.status(500).send({ message: 'Error during password comparison' });
    //             }

    //             if (isMatch) {
    //                 res.send({ message: 'Login successful', user: { username: user.username } });
    //             } else {
    //                 res.status(401).send({ message: 'Invalid username or password' });
    //             }
    //         });
    //     } else {
    //         res.status(401).send({ message: 'Invalid username or password' });
    //     }
    // });
    res.send({ message: 'Login successful', user: { username: 'kion' } })
});

app.post('/signup', (req, res) => {
    const { username, password, confirmPassword } = req.body;

    // const query = 'SELECT * FROM users WHERE username = ?';
    // db.query(query, [username], (err, result) => {
    //     if (err) {
    //         return res.status(500).send({ message: 'Database error' });
    //     }

    //     if (result.length > 0) {
    //         const user = result[0];

    //         // Compare the password with the hashed password in the database
    //         bcrypt.compare(password, user.password, (err, isMatch) => {
    //             if (err) {
    //                 return res.status(500).send({ message: 'Error during password comparison' });
    //             }

    //             if (isMatch) {
    //                 res.send({ message: 'Login successful', user: { username: user.username } });
    //             } else {
    //                 res.status(401).send({ message: 'Invalid username or password' });
    //             }
    //         });
    //     } else {
    //         res.status(401).send({ message: 'Invalid username or password' });
    //     }
    // });
    res.send({ message: 'Signup successful', user: { username: 'kion2' } })
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
