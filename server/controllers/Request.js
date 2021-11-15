const { Receipt } = require('../models');
const Author = require('./_author');
const User = require('./_user');

exports.create = (req, res) => Author.create(req, res, Receipt);
exports.update = (req, res) => User.update(req, res, Receipt);
exports.get = (req, res) => User.get(req, res, Receipt);
exports.delete = (req, res) => User.delete(req, res, Receipt);
