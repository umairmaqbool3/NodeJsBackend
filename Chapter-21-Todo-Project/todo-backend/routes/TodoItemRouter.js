const express = require('express');
const todoItemRouter = express.Router();
const TodoItemController = require('../controllers/TodoItemController');

// Create a new todo item
todoItemRouter.get('/', TodoItemController.getTodoItems);
todoItemRouter.post('/', TodoItemController.createTodoItem);
todoItemRouter.put('/:id/completed', TodoItemController.markCompleted);
todoItemRouter.delete('/:id', TodoItemController.deleteTodoItem);
 
module.exports = todoItemRouter;