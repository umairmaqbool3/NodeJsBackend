const express = require('express');
const contactRouter = require('./routes/contactRouter');
const homeRouter = require('./routes/homeRouter');
const path = require('path');
const rootDir = require('./util/pathUtil');
const app = express();

app.use(express.urlencoded());

app.use(homeRouter);
app.use(contactRouter);

app.use((req,res,next) => {
    res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});