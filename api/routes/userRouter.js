const express = require('express');
const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    //call signup service and return response(jwt token) to user
})


module.exports = userRouter;