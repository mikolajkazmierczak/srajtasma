const express = require('express');
const router = express.Router();

// Middleware
const { verifyLogin } = require('../middleware/auth');

// Controllers
const Product = require('../controllers/Product');

router.post('/', verifyLogin, Product.create);
router.put('/', verifyLogin, Product.updateMany);
router.put('/:id', verifyLogin, Product.updateById);
router.get('/', verifyLogin, Product.getMany);
router.get('/:id', verifyLogin, Product.getById);
router.delete('/', verifyLogin, Product.deleteMany);
router.delete('/:id', verifyLogin, Product.deleteById);

module.exports = router;
