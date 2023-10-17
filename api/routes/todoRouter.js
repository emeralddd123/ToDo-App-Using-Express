const express = require('express');
const todoRouter = express.Router();
const todoService = require('../../services/todoService');
const { validTodoCreation, validTodoUpdate } = require('../../middlewares/todoMiddleware')
const authenticate = require('../../middlewares/authMiddleware')

todoRouter.use(authenticate)

todoRouter.post('', validTodoCreation, async (req, res) => {
    try {
        const userId = req.user.id;
        const todoData = {
            title: req.body.title,
            description: req.body.description,
        };

        const result = await todoService.createTodoService(userId, todoData);

        if (result.status === 201) {
            res.status(result.status).json({ message: result.message, todo: result.todo });
        } else {
            res.status(result.status).json({ error: result.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



todoRouter.get('', async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await todoService.getTodosService(userId);

        if (result.status === 200) {
            res.status(result.status).json({ todos: result.todos });
        } else {
            res.status(result.status).json({ error: result.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



todoRouter.put('/:id', validTodoUpdate, async (req, res) => {
    try {
        const userId = req.user.id;
        const todoId = req.params.id;
        const updateData = {
            title: req.body.title,
            description: req.body.description,
        };

        const result = await todoService.updateTodoService(userId, todoId, updateData);

        if (result.status === 200) {
            res.status(result.status).json({ message: result.message, todo: result.todo });
        } else {
            res.status(result.status).json({ error: result.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



todoRouter.delete('/:id', async (req, res) => {
    try {
        const userId = req.user.id;
        const todoId = req.params.id;

        const result = await todoService.deleteTodoService(userId, todoId);

        if (result.status === 200) {
            res.status(result.status).json({ message: result.message, todo: result.todo });
        } else {
            res.status(result.status).json({ error: result.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




module.exports = todoRouter;
