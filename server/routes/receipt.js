const express = require('express');
const router = express.Router();

// Middleware
const { verifyLogin } = require('../middleware/auth');

// Controllers
const Receipt = require('../controllers/Receipt');

router.post('/', verifyLogin, Receipt.create);
router.put('/', verifyLogin, Receipt.update);
router.get('/', verifyLogin, Receipt.get);
router.delete('/', verifyLogin, Receipt.delete);

module.exports = router;
