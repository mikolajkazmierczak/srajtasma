const { Product } = require('../models');
const Common = require('./common');
const Author = require('./author');

exports.create = (req, res) => Author.create(req, res, Product);
exports.updateMany = (req, res) => Author.updateMany(req, res, Product);
exports.updateById = (req, res) => Author.updateById(req, res, Product);
exports.getMany = (req, res) => Common.getMany(req, res, Product);
exports.getById = (req, res) => Common.getById(req, res, Product);
exports.deleteMany = (req, res) => Common.deleteMany(req, res, Product);
exports.deleteById = (req, res) => Common.deleteById(req, res, Product);
