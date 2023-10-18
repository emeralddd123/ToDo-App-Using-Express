const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const loginService = require('../services/authService')
const signupService = require('../services/userService')
const webAuthMiddleware = require('../middlewares/webAuthMidldleware')
const { getTodosService } = require('../services/todoService')

const webRouter = express.Router();

webRouter.use(express.static('public'));
webRouter.use(cookieParser())


webRouter.get('/', async (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

webRouter.get('/home', webAuthMiddleware, async (req, res) => {
	const response = await getTodosService(req.user._id)
	if (response.status === 200) {
		tasks = response.todos
		return res.render('home', { user: req.user, tasks: tasks })
	}
	res.json(response.message)
});

webRouter.get('/login', async (req, res) => {
	res.render('login', { pageTitle: 'Login Page' })
});

webRouter.post('/login', async (req, res) => {
	const { username, password } = req.body
	const response = await loginService({ username, password })

	if (response.status === 201) {

		res.cookie('jwt', response.token)
		res.redirect('home')
	} else {
		res.render('login')
	}
});

webRouter.get('/signup', async (req, res) => {
	res.render('signup')
});

webRouter.post('/signup', async (req, res) => {
	const { email, username, phoneNumber, password } = req.body

	const response = await signupService({ email, username, phoneNumber, password })
	if (response.status === 201) {
		res.cookie('jwt', response.token)
		res.redirect('home')
	} else {
		const message = response.message
		res.render('signup', { message })
	}

});

webRouter.get('/addTodo', (req, res) => {
	res.render('addTodo')
});

module.exports = webRouter;
