const mongoose = require('mongoose');
const User = require('./user');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['completed', 'pending'],
        default: 'pending',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
