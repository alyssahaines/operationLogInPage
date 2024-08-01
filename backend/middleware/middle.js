const jwt = require('jsonwebtoken');
require('dotenv').config();

const dashboardAuth = (req,res,next) => {
    const token = req.headers['Authorization'].split('')[1];
    const verify = jwt.verify(token,JWT_SECRET);
    if (!verify) {
        res.status(401).json({message: 'Could not load message'});
    }
    req.user = verify;
    next(); 
};
module.exports = dashboardAuth;