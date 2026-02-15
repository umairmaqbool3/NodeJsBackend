const express = require('express');
const path = require('path');
const hostRouter = express.Router();

const rootDir = require('../utils/pathUtil');

hostRouter.get("/add-home",(req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "addHome.html"));
    // res.send(`<h1>Register your home here</h1>
    //     <form action="/add-home" method="POST">
    //         <input type="text" name="name" placeholder="Home Name" required />
    //         <button type="submit">Submit</button>
    //     </form>
    // `);
});

hostRouter.post("/add-home",(req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "homeAdded.html"));
    // res.send(`<h1>Your Home Registered Successfully!</h1>
    //     <p>Home Name: ${req.body.name}</p>
    //     <a href="/">Go Back to Home</a>
    // `);
});

module.exports = hostRouter;