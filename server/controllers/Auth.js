const bcrypt = require('bcryptjs');
const { User } = require('../models');

function startSession(req, user) {
  req.session._id = user._id;
  req.session.firstName = user.firstName;
  req.session.lastName = user.lastName;
}

exports.register = (req, res) => {
  User.findOne({ phone: req.body.phone }, (err, user) => {
    if (err) return res.status(500).send({ error: err });
    if (user) return res.status(403).send({ error: 'User already exists.' });
    User.create(
      {
        phone: req.body.phone,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
      },
      (err, user) => {
        if (err) return res.status(500).send({ error: err });

        startSession(req, user);
        return res.status(200).send({ message: 'Registered! Authenticated.' });
      }
    );
  });
};

exports.login = (req, res) => {
  User.findOne({ phone: req.body.phone }, (err, user) => {
    if (err) return res.status(500).send({ error: err });
    if (!user) return res.status(404).send({ error: 'User not found.' });

    // check if the password is valid
    const password = req.body.password;
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid)
      return res.status(400).send({ error: 'Password is invalid.' });

    startSession(req, user);
    return res.status(200).send({ message: 'Logged in! Authenticated.' });
  });
};

exports.logout = (req, res) => {
  req.session.destroy();
  return res.send({ message: 'Logged out.' });
};

exports.me = (req, res) => {
  User.findById(req.session._id, '-password -__v', (err, user) => {
    if (err) return res.status(500).send({ error: err });
    if (!user) return res.status(404).send({ error: 'User not found.' });
    return res.status(200).send(user);
  });
};
