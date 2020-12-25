/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getUsers", "addUser"] }] */

const {
  addNewUser, getUsersList, update, remove, findUserById,
} = require('../database/users');

const ERROR_CODES = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

async function getUsers() {
  try {
    const res = await getUsersList();
    return res;
  } catch (error) {
    return { message: `Failed to load the list of users, Err: ${error.message}`, error, status: ERROR_CODES.INTERNAL_SERVER_ERROR };
  }
}

async function addUser(user) {
  try {
    const res = await addNewUser(user);
    return res.ops;
  } catch (error) {
    return { message: `Could not add the user, Err: ${error.message}`, error, status: ERROR_CODES.INTERNAL_SERVER_ERROR };
  }
}

async function updateUser(user, id) {
  try {
    const data = await findUserById(id);
    const userInfo = data[0];
    if (!userInfo) {
      return { error: `Could not found the user with id ${id}`, status: ERROR_CODES.NOT_FOUND };
    }

    Object.keys(userInfo).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(user, key)) {
        userInfo[key] = user[key];
      }
    });

    const res = await update(userInfo, id);
    return res;
  } catch (err) {
    return { error: `Could not update the user, Err: ${err.message}`, err, status: ERROR_CODES.INTERNAL_SERVER_ERROR };
  }
}

async function updateUserPoints(id, action) {
  try {
    const data = await findUserById(id);
    const userInfo = data[0];
    if (!userInfo) {
      return { error: `Could not found the user with id ${id}`, status: ERROR_CODES.NOT_FOUND };
    }

    userInfo.points = Math.max(0, (userInfo.points + parseInt(action, 10)));
    const res = await update(userInfo, id);
    return res;
  } catch (err) {
    return { error: `Could not update the user, Err: ${err.message}`, err, status: ERROR_CODES.INTERNAL_SERVER_ERROR };
  }
}

async function deleteUser(id) {
  try {
    const data = await findUserById(id);
    const userInfo = data[0];
    if (!userInfo) {
      return { error: `Could not found the user with id ${id}`, status: ERROR_CODES.NOT_FOUND };
    }
    const res = await remove(id);
    return res;
  } catch (err) {
    return { error: `Could not delete the user, Err: ${err.message}`, err, status: ERROR_CODES.INTERNAL_SERVER_ERROR };
  }
}

module.exports = {
  getUsers,
  addUser,
  updateUser,
  updateUserPoints,
  deleteUser,
};
