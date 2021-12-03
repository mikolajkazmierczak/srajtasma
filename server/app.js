const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { verifyLogin } = require('./middleware/auth');
const { DateTime } = require('luxon');

const app = express();

// load environment variables
dotenv.config();

// setup cors and cookies
const { CLIENT_ORIGIN } = process.env;
console.log(`Accepted origin: ${CLIENT_ORIGIN}`);
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// Use the session middleware
const { SESSION_SECRET_KEY } = process.env;
const COOKIE_AGE_MS = 15 * 60 * 1000;
app.use(
  session({
    secret: SESSION_SECRET_KEY,
    cookie: { maxAge: COOKIE_AGE_MS },
    resave: false, // dependent on the database
    saveUninitialized: true,
  })
);

app.get('/', verifyLogin, (req, res) => res.send({ message: '/' }));
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/receipt', require('./routes/receipt'));
app.use('/request', require('./routes/request'));

console.log(DateTime.now().toISO());
// console.log(DateTime.now().plus({ minutes: 5 }).toISO());

module.exports = app;
