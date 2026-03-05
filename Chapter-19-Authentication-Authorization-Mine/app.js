// require('dotenv').config();
// // Core Module
// const path = require('path');

// // External Module
// const express = require('express');
// const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);

// //Local Module
// const storeRouter = require("./routes/storeRouter")
// const hostRouter = require("./routes/hostRouter")
// const authRouter = require("./routes/authRouter")
// const rootDir = require("./utils/pathUtil");
// const errorsController = require("./controllers/errors");
// const { default: mongoose } = require('mongoose');

// const app = express();

// app.set('view engine', 'ejs');
// app.set('views', 'views');

// const store = new MongoDBStore({
//   uri: process.env.MONGODB_URI,
//   collection: 'sessions'
// });

// app.use(express.urlencoded());
// app.use(session({
//   secret: 'my secret key',
//   resave: false,
//   saveUninitialized: true,
//   store: store
// }));
// app.use((req, res, next) => {
//   console.log("session data : ", req.session);
//   //Logic 1
//   // req.isLoggedIn = req.get("Cookie") && req.get("Cookie").includes("isLoggedIn=true");
//   //Logic 2
//   // req.isLoggedIn = req.get('Cookie') ? req.get('Cookie').split('=')[1] === 'true' : false;
//   //Now read from session
//   req.isLoggedIn = req.session.isLoggedIn;
//   next();
// });
// app.use(authRouter);
// app.use(storeRouter);
// app.use('/host', (req, res, next) => {
//   if(req.isLoggedIn) {
//     return next();
//   }else{
//     res.redirect("/login");
//   }
// });
// app.use("/host", hostRouter);

// app.use(express.static(path.join(rootDir, 'public')))

// app.use(errorsController.pageNotFound);

// const PORT = 3000;
// mongoose.connect(process.env.MONGODB_URI).then(() => {
//   console.log("Connected to MongoDB");
//   app.listen(PORT, () => {
//     console.log(`Server running on address http://localhost:${PORT}`);
//   });
// }).catch((err) => {
//   console.error("Error connecting to MongoDB:", err);
// });


require('dotenv').config();
// Core Module
const path = require('path');

// External Module
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const DB_PATH = process.env.MONGODB_URI

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const authRouter = require("./routes/authRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const { default: mongoose } = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'sessions'
});

app.use(express.urlencoded());
app.use(session({
  secret: "KnowledgeGate AI with Complete Coding",
  resave: false,
  saveUninitialized: true,
  store
}));

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn
  next();
})

app.use(authRouter)
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);

const PORT = 3000;

mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});
