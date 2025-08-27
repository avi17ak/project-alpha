const jwt = require('jsonwebtoken');

function authenticator(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

    if (!token) {
        return res.status(403).json({ err: 'Missing token' });
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, data) => {
        if (err) {
            return res.status(403).json({ err: 'Invalid token' });
        }
        req.user = data; // optionally store decoded payload
        next();
    });
}

module.exports = authenticator;
