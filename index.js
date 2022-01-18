require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
/* connect-pg-simple est un module qui permet de gérer la communication entre express-session et notre bdd Postgres */
const pgSession = require('connect-pg-simple')(session);
const router = require('./app/router');

const port = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.urlencoded({ extended: true }));

/* un Pool est comme un client, la différence est que le Pool peut gérer plusieurs connexions à la fois alors que le client n'en gère qu'une */
const { Pool } = require('pg');
const pgPool = new Pool({
  connectionString:process.env.PG_URL
});

app.use(session({
  store: new pgSession({
    pool : pgPool,// Connection pool
    tableName : 'user_sessions'// Use another table-name than the default "session" one
    // Insert connect-pg-simple options here
  }),
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