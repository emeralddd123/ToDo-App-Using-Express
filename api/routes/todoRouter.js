const express = require('express');
const todoRouter = express.Router();

todoRouter.get('/', async (req, res) => {
    //return the list of user's task

})

todoRouter.get('/:id', async (req, res) => {
    // call get one task service

})

todoRouter.post('/', async (req, res) => {
    //call create todo service

})

todoRouter.put('/:id', async (req, res) => {
    // call update todo service

})

todoRouter.delete('/:id', async (req, res) => {
    // call delete todo service

})

module.exports = todoRouter;
