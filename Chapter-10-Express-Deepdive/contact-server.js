const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) => {
  console.log('First middleware : ', req.method, req.url);
  next();
});

app.use((req, res, next) => {
    console.log('Second middleware : ', req.method, req.url);
    next();
});

app.get('/',(req, res, next) => {
  console.log('Handling / path--------', req.method, req.url);
  res.send('Hello from Express!');
});

app.get('/contact-us', (req, res, next) => {
  console.log('Handling /contact path--------', req.method, req.url);
  res.send(`
    <h1>Please give your details here</h1>
    <form action="/contact-us" method="POST">
      <input type="text" name="name" placeholder="Your Name" required />
      <input type="email" name="email" placeholder="Your Email" required />
      <button type="submit">Submit</button>
    </form>
  `);
});

app.use(bodyParser.urlencoded());

app.post('/contact-us', (req, res, next) => {
  console.log('Handling POST / contact path--------', req.body);
  res.send(`<h1>Thank you for contacting us!</h1>`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});