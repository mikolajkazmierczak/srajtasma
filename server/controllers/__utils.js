exports.isObjectEmpty = object => {
  return Object.keys(object).length === 0;
};

exports.getModelName = model => {
  // Get the name of a model as a string,
  // capitalize first letter and remove last letter ("s").
  let name = model.collection.collectionName;
  return name[0].toUpperCase() + name.slice(1, -1);
};

exports.getUser = req => {
  // Get the current session user.
  return {
    _id: req.session._id,
    firstName: req.session.firstName,
    lastName: req.session.lastName,
  };
};

exports.filterDocsByUser = (req, docs, filter = {}, authorOnly = false) => {
  // Only get documents that:
  // - were created by the current session's user
  // - or (if !authorOnly) the 'users' field contains the current session's user
  // docs: id / [id]
  // filter: {filter}
  const user = exports.getUser(req);
  if (typeof docs == 'string') docs = [docs];
  let auth = [{ createdBy: user }];
  if (!authorOnly) auth.push({ users: user });
  let output = { $and: [{ $or: auth }, filter] };
  if (docs) output.$and.push({ _id: { $in: docs } });
  return output;
};
