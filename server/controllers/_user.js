const { getUser, filterDocsByUser } = require('./__utils');

exports.update = (req, res, model, authorOnly = false) => {
  /* req.body: { documents: id / [id], filter: {filter}, update: {update} } */
  const { documents, filter, update } = req.body;
  if (!documents)
    return res.status(400).send({ error: 'No documents specified.' });
  const user = getUser(req);
  model.updateMany(
    filterDocsByUser(req, documents, filter, authorOnly),
    { ...update, updatedBy: user },
    (err, documents) => {
      if (err) return res.status(500).send({ error: err });
      if (!documents)
        return res.status(404).send({ message: `Documents not found.` });
      return res
        .status(201)
        .send({ message: `Updated ${documents.length} document(s).` });
    }
  );
};

exports.get = (req, res, model, authorOnly = false) => {
  /* req.body: { documents: id / [id], filter: {filter} } */
  const { documents, filter } = req.body;
  model.find(
    filterDocsByUser(req, documents, filter, authorOnly),
    '-__v',
    (err, docs) => {
      console.log('test');
      if (err) return res.status(500).send({ error: err });
      if (!docs)
        return res.status(404).send({ message: `Documents not found.` });
      return res.status(200).json(docs);
    }
  );
};

exports.delete = (req, res, model, authorOnly = false) => {
  /* req.body: { documents: id / [id], filter: {filter} } */
  const { documents, filter } = req.body;
  if (!documents)
    return res.status(400).send({ error: 'No documents specified.' });
  model.deleteMany(
    filterDocsByUser(req, documents, filter, authorOnly),
    (err, docs) => {
      if (err) return res.status(500).send({ error: err });
      if (!docs)
        return res.status(404).send({ message: `Documents not found.` });
      return res.status(200).send({ message: `Deleted ${docs.length} docs.` });
    }
  );
};
