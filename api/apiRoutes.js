const express = require('express');
const apiRouter = express.Router();

const userRouter = require('./routes/userRouter')
const todoRouter = require('./routes/todoRouter')
const authRouter = require('./routes/authRouter')

apiRouter.use('/users', userRouter);
apiRouter.use('/todos', todoRouter);
apiRouter.use('/auth', authRouter)

module.exports = apiRouter;
