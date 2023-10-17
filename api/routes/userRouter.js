const express = require('express');
const userRouter = express.Router();
const signupService = require('../../services/userService');
const { validUserCreation } = require('../../middlewares/userMiddleware')

userRouter.post('/signup', validUserCreation, async (req, res) => {
	try {
		const userData = {
			email: req.body.email,
			username: req.body.username,
			phoneNumber: req.body.phoneNumber,
			password: req.body.password,
		};

		const result = await signupService(userData);

		if (result.status === 201) {
			res.status(result.status).json({ message: result.message, value: result.token });
		} else {
			res.status(result.status).json({ error: result.message });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
});


module.exports = userRouter;
