const jwt = require('jsonwebtoken');
require('dotenv').config();

const dashboardAuth = (req,res,next) => {
    const access = req.headers['Authorization'];
    
    if (!access) {
        res.status(401).json({message: 'Could not load message'});
        return;
    }
    try {
        const [bearer,token] = access.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return res.status(401).json({ message: 'Invalid authorization header format' });
        }
    const decoded = jwt.verify(token,JWT_SECRET);
    req.user = decoded;
    next(); 
    }
    catch (error) {
        res.status(401).json({message: 'Invalid token'});
    }
};
module.exports = dashboardAuth;