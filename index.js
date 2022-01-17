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
  secret: process.env.SECRET_KEY,
  resave: true,// permet de gérer automatiquement l'enregistrement de notre session
  saveUninitialized: true,// permet de gérer les sessions des visiteurs non inscrits
  cookie : {
    secure: false,
    maxAge: (1000*60*60) // ms * sec * min = 1h
  }
}));

app.use(express.static(path.join(__dirname, './integration')));

app.use(router);

app.listen(port,() => {
  console.log(`http://localhost:${port}`);
});