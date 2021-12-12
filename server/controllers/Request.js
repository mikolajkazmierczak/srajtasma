const { Request } = require('../models');
const Author = require('./_author');
const User = require('./_user');

exports.create = (req, res) => Author.create(req, res, Request);
exports.update = (req, res) => User.update(req, res, Request);
exports.get = (req, res) => User.get(req, res, Request);
exports.delete = (req, res) => User.delete(req, res, Request);
