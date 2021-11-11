exports.verifyLogin = (req, res, next) => {
  if (req.session._id) return next();
  return res.status(401).send({ error: 'Unauthorized!' });
};
