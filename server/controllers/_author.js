const { getUser, getModelName } = require('./__utils');
const name = getModelName;

exports.create = (req, res, model) => {
  /* req.body: {document} OR [ {document} ] */
  try {
    const user = getUser(req);
    // check if inserting one or multiple documents
    if (typeof req.body === 'Array') {
      // add created_by and updated_by to each document
      let docs = req.body;
      docs.forEach(doc => (doc = { ...doc, createdBy: user, updatedBy: user }));
      model.insertMany(docs, err => {
        if (err) return res.status(500).send({ error: err });
        return res.status(201).send({ message: `${name(model)}s created.` });
      });
    } else {
      model.create({ ...req.body, createdBy: user, updatedBy: user }, err => {
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
    const user = getUser(req);
    req.body.forEach(elem => {
      model.findByIdAndUpdate(
        elem._id,
        { ...elem.updates, updatedBy: user },
        (err, document) => {
          if (err) return res.status(500).send({ error: err });
          if (!document)
            return res.status(404).send({ error: `${name(model)} not found.` });
          return res.status(201).send({ message: `${name(model)} updated.` });
        }
      );
    });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};

exports.updateById = (req, res, model) => {
  /* req.params: { id: string } */
  /* req.body: {update} */
  const user = getUser(req);
  model.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedBy: user },
    (err, document) => {
      if (err) return res.status(500).send({ error: err });
      if (!document)
        return res.status(404).send({ error: `${name(model)} not found.` });
      return res.status(201).send({ message: `${name(model)} updated.` });
    }
  );
};
