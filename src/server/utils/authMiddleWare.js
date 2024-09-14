const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies['auth_token'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, '12345678', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        req.user = decoded;
        next();
    });
};

module.exports = { verifyToken };
