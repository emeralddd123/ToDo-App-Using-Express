const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const loginService = require('../services/authService')
const signupService = require('../services/userService')
const webAuthMiddleware = require('../middlewares/webAuthMidldleware')
const { getTodosService, createTodoService, updateTodoService, deleteTodoService } = require('../services/todoService')

const webRouter = express.Router();

webRouter.use(express.static('public'));
webRouter.use(cookieParser())


webRouter.get('/', async (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

webRouter.get('/login', async (req, res) => {
	try {
		let message
		res.render('login', { user: req.user, message })
	} catch (error) {
		res.redirect('/errorPage')
	}
});

webRouter.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body
		const response = await loginService({ username, password })

		if (response.status === 201) {

			res.cookie('jwt', response.token)
			res.redirect('/home')
		} else {
			const message = response.message
			res.render('login', { user: req.user, message })
		}
	} catch (error) {
		res.redirect('/errorPage')
	}
});

webRouter.get('/home', webAuthMiddleware, async (req, res) => {
	try {
		const response = await getTodosService(req.user._id)
		if (response.status === 200) {
			tasks = response.todos
			return res.render('home', { user: req.user, tasks: tasks })
		}
		res.json(response.message)
	} catch (error) {
		res.redirect('/errorPage')
	}
});


webRouter.get('/signup', async (req, res) => {
	try {
		let message
		res.render('signup', { user: req.user, message })
	} catch (error) {
		res.redirect('/errorPage')
	}
});

webRouter.post('/signup', async (req, res) => {
	try {
		const { email, username, phoneNumber, password } = req.body

		const response = await signupService({ email, username, phoneNumber, password })
		if (response.status === 201) {
			res.cookie('jwt', response.token)
			res.redirect('/home')
		} else {
			const message = response.message
			res.render('signup', { message, user: req.user })
		}

	} catch (error) {
		res.redirect('/errorPage')
	}
});


webRouter.post('/addTask', webAuthMiddleware, async (req, res) => {
	try {
		const todoData = { title, description } = req.body
		const userId = req.user._id

		const response = await createTodoService(userId, todoData)

		if (response.status === 201) {
			return res.redirect('/home')
		}
		res.json('an error occured')

	} catch (error) {
		res.redirect('/errorPage')
	}
});


webRouter.post('/updateTask/:id', webAuthMiddleware, async (req, res) => {
	try {
		const updatedData = { title, description, status } = req.body
		const userId = req.user._id
		const todoId = req.params.id

		const response = await updateTodoService(userId, todoId, updatedData)

		if (response.status = 200) {
			return res.redirect('/home')
		}
		res.json('an error occured')
	} catch (error) {
		res.redirect('/errorPage')
	}
})


webRouter.post('/deleteTask/:id', webAuthMiddleware, async (req, res) => {
	try {
		const userId = req.user._id
		const todoId = req.params.id
		console.log('here')
		const response = await deleteTodoService(userId, todoId)

		if (response.status = 200) {
			return res.redirect('/home')
		}
		res.json('an error occured')
	} catch (error) {
		res.redirect('/errorPage')
	}
})

webRouter.get('/logout', (req, res) => {
	try {
		res.clearCookie('jwt')
		res.redirect('/')
	} catch (error) {
		res.redirect('/errorPage')
	}
});

webRouter.get('/errorPage', (req, res) => {
	res.render('errorPage')
})

webRouter.get('*', async (req, res) => {
	res.status(404).render('404', { user: req.user })
})
module.exports = webRouter;
