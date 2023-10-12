const express = require('express');
const apiRouter = express.Router();


apiRouter.use('/users', usersRouter);
apiRouter.use('/products', productsRouter);

module.exports = apiRouter;