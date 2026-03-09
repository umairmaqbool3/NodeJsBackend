require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const errorsController = require('./controllers/errors');
// const rootDir = require('./util/path');
const todoItemRouter = require('./routes/TodoItemRouter');

const app = express();
 
app.use(express.urlencoded());
// app.use(express.static(path.join(rootDir, 'public')))
app.use(express.json());
app.use(cors());
app.use('/api/todo', todoItemRouter);

app.use(errorsController.pageNotFound);

const PORT = 3003;

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});
