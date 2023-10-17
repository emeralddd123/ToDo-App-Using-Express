const express = require('express');
const authRouter = express.Router();
const loginService = require('../../services/authService')
const { validLoginCreation } = require('../../middlewares/userMiddleware')


authRouter.post('/login', validLoginCreation, async (req, res) => {
    const loginData = {
        username: req.body.username,
        password: req.body.password,
      };
    
      const result = await loginService(loginData);
    
      if (result.status === 201) {
        res.status(result.status).json({ message: result.message, token: result.token });
      } else {
        res.status(result.status).json({ error: result.message });
      }
})


module.exports = authRouter;
