const express = require('express');
const todoItemRouter = express.Router();
const TodoItemController = require('../controllers/TodoItemController');

// Create a new todo item
router.post('/', TodoItemController.createTodoItem);

module.exports = todoItemRouter;