const express = require('express');
const router = express.Router();

// Middleware
const { verifyLogin } = require('../middleware/auth');

// Controllers
const Auth = require('../controllers/Auth');

router.post('/register', Auth.register);
router.post('/login', Auth.login);
router.get('/logout', Auth.logout);
router.get('/me', verifyLogin, Auth.me);

module.exports = router;
