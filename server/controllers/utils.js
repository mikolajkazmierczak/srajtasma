exports.isObjectEmpty = object => {
  return Object.keys(object).length === 0;
};

exports.getModelName = model => {
  let name = model.collection.collectionName;
  // capitalize first letter and remove last letter ("s")
  return name[0].toUpperCase() + name.slice(1, -1);
};
