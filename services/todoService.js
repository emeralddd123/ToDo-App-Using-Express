const Todo = require('../models/todo');


async function createTodoService(userId, todoData) {
    try {
        const newTodo = await Todo.create({ ...todoData, user: userId });
        return { status: 201, message: 'Todo created', todo: newTodo };
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Internal server error' };
    }
}


async function getTodosService(userId) {
    try {
        const todos = await Todo.find({ user: userId, is_deleted: false });
        return { status: 200, todos };
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Internal server error' };
    }
}


async function updateTodoService(userId, todoId, updateData) {
    try {
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: todoId, user: userId },
            updateData,
            { new: true }
        );

        if (!updatedTodo) {
            return { status: 404, message: 'Todo not found or does not belong to the user' };
        }

        return { status: 200, message: 'Todo updated', todo: updatedTodo };
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Internal server error' };
    }
}


async function deleteTodoService(userId, todoId) {
    try {
        const deletedTodo = await Todo.findOneAndUpdate(
            { _id: todoId, user: userId },
            { is_deleted: true },
            { new: true }
        );

        if (!deletedTodo) {
            return { status: 404, message: 'Todo not found or does not belong to the user' };
        }

        return { status: 200, message: 'Todo marked as deleted', todo: deletedTodo };
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Internal server error' };
    }
}


module.exports = {
    createTodoService,
    getTodosService,
    updateTodoService,
    deleteTodoService,
};
