const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req, res, next) => {
    // First check request headers has authorized token or not
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({Error: 'Token not found'});

    // Extract jwt token from the request header
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({Error: 'Unauthorized'});
    try {
        // Verify jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach the user info to the request object
        req.user = decoded;
        next();
    } catch(err) {
        console.log(err);
        res.status(401).json({Error : 'Invalid token'});
    }
}

// Function to generate token
const generateToken = (userData) => {
    // Generate new token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn : 300});
}

module.exports = {jwtAuthMiddleware, generateToken};