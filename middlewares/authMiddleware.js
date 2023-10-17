const jwt = require('jsonwebtoken')
require('dotenv').config()


const authenticate = (req, res, next) => {
    // some code to check for user authentication
    const authToken = req.headers.authorization
    if (!authToken){
        return res.status(401).json({message:"Authentication Credentials not provided"})
    }
    if (authToken.split(' ')[0] !== "Bearer" || !authToken.split(' ')[1]) {
        return res.json("invalid authorization header")
    }

    const token = authToken.split(' ')[1]

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decodedToken.user
    } catch (error) {
        return res.json(error)
    }

    next()
}

module.exports = authenticate