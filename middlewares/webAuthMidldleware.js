const jwt = require('jsonwebtoken')
require('dotenv').config()


const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.jwt
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decodedToken.user
    } catch (error) {
        return res.redirect('login')
    }

    next()
}

module.exports = authenticate
