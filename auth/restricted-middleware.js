const jwt = require("jsonwebtoken");


module.exports = ( req, res, next ) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify (token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ 
                    message: "invalid credentials"
                })
            } else {
                next();
            }
        })
    } else {
        res.status(401).json({
            message: "no token"
        })
    }
}
