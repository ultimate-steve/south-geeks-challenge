const admin = require("firebase-admin");

const getCollection = async (params) => {
  const snapshot = await admin.database().ref(params.collection).orderByChild(params.orderField).once("value");
  const collection = [];
  snapshot.forEach(snap => {
    collection.push(snap.val());
  });

  return collection;
};

const getDocument = async (path) => {
  const snapshot = await admin.database().ref(path).once("value");

  return snapshot.val();
};

const setDocument = async (path, data) => {
  return admin.database().ref(path).update(data);
};

const deleteDocument = async (path) => {
  return admin.database().ref(path).remove();
};

module.exports = { getCollection, getDocument, setDocument, deleteDocument };
