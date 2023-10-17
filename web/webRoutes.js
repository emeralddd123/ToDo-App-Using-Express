const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const authService = require('../services/authService')

const webRouter = express.Router();

webRouter.use(express.static('public'));
webRouter.use(cookieParser())


webRouter.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

webRouter.get('/home', (req, res) => {
	res.render('home')
});

webRouter.get('/login', (req, res) => {
	res.render('login', { pageTitle: 'Login Page' })
});

webRouter.post('/login', (req, res) => {

	res.render('login')
});

webRouter.get('/signup', (req, res) => {
	res.render('signup')
});

webRouter.post('/home', (req, res) => {
	res.render('signup')
});

webRouter.get('/home', (req, res) => {
	res.render('signup')
});

module.exports = webRouter;
