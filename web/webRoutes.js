const express = require('express');
const webRouter = express.Router();

webRouter.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); 
});

module.exports = webRouter;