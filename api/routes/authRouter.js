const express = require('express');
const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    //call login authService and return token to user
})


module.exports = authRouter;