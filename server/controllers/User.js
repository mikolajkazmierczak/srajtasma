const { User } = require('../models');

exports.getMany = (req, res) => {
  /* req.body: {filter} */
  User.find(req.body, '-password -__v', (err, users) => {
    if (err) return res.status(500).send({ error: err });
    if (!users) return res.status(404).send({ error: `Users not found.` });
    return res.status(200).json(users);
  });
};

exports.getById = (req, res) => {
  /* req.params: { id: string } */
  User.findById(req.params.id, '-password -__v', (err, user) => {
    if (err) return res.status(500).send({ error: err });
    return res.status(200).json(user);
  });
};
