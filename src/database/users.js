/**/
const { getDatabase } = require('./mongo');

const collectionName = 'users';

async function getUsersList() {
  const database = await getDatabase();
  const data = await database.collection(collectionName).find({}).toArray();
  return data;
}

async function findUserById(id) {
  const database = await getDatabase();
  const data = await database.collection(collectionName).find({ _id: id }).toArray();
  return data;
}

async function addNewUser(user) {
  const database = await getDatabase();
  const data = await database.collection(collectionName).insertOne(user);
  return data;
}

async function update(userInfo, id) {
  const database = await getDatabase();
  const data = await database.collection(collectionName).updateOne({ _id: id }, { $set: userInfo });
  return data;
}

async function remove(id) {
  const database = await getDatabase();
  const data = await database.collection(collectionName).deleteOne({ _id: id });
  return data;
}

module.exports = {
  getUsersList,
  addNewUser,
  update,
  remove,
  findUserById,
};
