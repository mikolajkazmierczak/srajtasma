require('dotenv').config();
require('./db').connect();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { DateTime } = require('luxon');

const { CLIENT_ORIGIN, SESSION_SECRET_KEY } = process.env;
console.log(`Accepted origin: ${CLIENT_ORIGIN}`);

const app = express();
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// Use the session middleware
const COOKIE_AGE_MS = 15 * 60 * 1000;
app.use(
  session({
    secret: SESSION_SECRET_KEY,
    cookie: { maxAge: COOKIE_AGE_MS },
    resave: false, // dependent on the database
    saveUninitialized: true,
  })
);

const { verifyLogin } = require('./middleware/auth');

app.get('/', verifyLogin, (req, res) => {
  return res.send({ message: '/' });
});

app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/receipt', require('./routes/receipt'));
app.use('/request', require('./routes/request'));

console.log(DateTime.now().toISO());
// console.log(DateTime.now().plus({ minutes: 5 }).toISO());

module.exports = app;
