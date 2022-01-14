require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const router = require('./app/router');

const port = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.urlencoded({ extended: true }));

app.use(session({
  // doc express-session : npmjs.com/package/express-session
  // secret: generate the tokens
  secret: process.env.SECRET_KEY,
  // session auto save at the end of the request
  resave: false,
  // even if empty, save the session
  saveUninitialized: true,
  cookie : {
    secure: false,
    maxAge: (1000*60*60) // ça fait une heure
  }
}));

app.use(express.static(path.join(__dirname, './integration')));

app.use(router);

app.listen(port,() => {
  console.log(`http://localhost:${port}`);
});