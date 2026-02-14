const express = require('express');
const userRouter = express.Router();

userRouter.get("/",(req, res, next) => {
    res.send(`<h1>Hello from Express!</h1>
          <a href="/add-home">Add Home</a>
      `);
});

module.exports = userRouter;