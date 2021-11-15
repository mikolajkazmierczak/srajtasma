const express = require('express');
const router = express.Router();

// Middleware
const { verifyLogin } = require('../middleware/auth');

// Controllers
const Request = require('../controllers/Request');

router.post('/', verifyLogin, Request.create);
router.put('/', verifyLogin, Request.update);
router.get('/', verifyLogin, Request.get);
router.delete('/', verifyLogin, Request.delete);

module.exports = router;
