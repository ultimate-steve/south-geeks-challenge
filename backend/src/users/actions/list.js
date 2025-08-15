const { getCollection } = require("../../db");

const list = async (params) => {
  params.collection = "users";
  params.orderField = "name";
  const collection = await getCollection(params);
  return collection;
};

module.exports = list;
