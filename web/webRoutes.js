const express = require('express');
const webRouter = express.Router();
const path = require('path');

webRouter.use(express.static('public'));

webRouter.get('/', (req, res) => {
  // Use path.join to construct the correct path to the HTML file
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = webRouter;
