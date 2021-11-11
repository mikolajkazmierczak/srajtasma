const { getModelName } = require('./utils');
const name = getModelName;

exports.create = (req, res, model) => {
  /* req.body: {document} OR [ {document} ] */
  try {
    // check if inserting one or multiple documents
    if (typeof req.body === 'Array') {
      model.insertMany(req.body, err => {
        if (err) return res.status(500).send({ error: err });
        return res.status(201).send({ message: `${name(model)}s created.` });
      });
    } else {
      model.create(req.body, err => {
        if (err) return res.status(500).send({ error: err });
        return res.status(201).send({ message: `${name(model)} created.` });
      });
    }
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};

exports.updateMany = (req, res, model) => {
  /* req.body: [ { _id: string, update: {update} } ] */
  try {
    req.body.forEach(elem => {
      model.findByIdAndUpdate(elem._id, elem.update, (err, document) => {
        if (err) return res.status(500).send({ error: err });
        if (!document)
          return res.status(404).send({ error: `${name(model)} not found.` });
        return res.status(201).send({ message: `${name(model)} updated.` });
      });
    });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};

exports.updateById = (req, res, model) => {
  /* req.params: { id: string } */
  /* req.body: {update} */
  model.findByIdAndUpdate(req.params.id, req.body, (err, document) => {
    if (err) return res.status(500).send({ error: err });
    if (!document)
      return res.status(404).send({ error: `${name(model)} not found.` });
    return res.status(201).send({ message: `${name(model)} updated.` });
  });
};

exports.getMany = (req, res, model) => {
  /* req.body: {filter} */
  model.find(req.body, '-__v', (err, documents) => {
    if (err) return res.status(500).send({ error: err });
    if (!documents)
      return res.status(404).send({ error: `${name(model)}s not found.` });
    return res.status(200).json(documents);
  });
};

exports.getById = (req, res, model) => {
  /* req.params: { id: string } */
  model.findById(req.params.id, '-__v', (err, document) => {
    if (err) return res.status(500).send({ error: err });
    if (!document)
      return res.status(404).send({ error: `${name(model)} not found.` });
    return res.status(200).json(document);
  });
};

exports.deleteMany = (req, res, model) => {
  /* req.body: {filter} */
  model.deleteMany(req.body, (err, documents) => {
    if (err) return res.status(500).send({ error: err });
    if (!documents)
      return res.status(404).send({ error: `${name(model)}s not found.` });
    return res.status(200).send({ message: `${name(model)}s deleted.` });
  });
};

exports.deleteById = (req, res, model) => {
  /* req.params: { id: string } */
  model.findByIdAndDelete(req.params.id, (err, document) => {
    if (err) return res.status(500).send({ error: err });
    if (!document)
      return res.status(404).send({ error: `${name(model)} not found.` });
    return res.status(200).send({ message: `${name(model)} deleted.` });
  });
};
