const jwt = require('jsonwebtoken');

const jwtSecret = '12345678';

exports.generateToken = (user_id, username) => {
    return jwt.sign(
        { user_id, username },
        jwtSecret,
        { expiresIn: '1h' }
    );
};
