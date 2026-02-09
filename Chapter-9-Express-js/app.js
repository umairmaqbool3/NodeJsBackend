const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('First middleware : ', req.method, req.url);
  next();
});

app.use((req, res, next) => {
    console.log('Second middleware : ', req.method, req.url);
    res.send('Hello from Express!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});