const {
  getUsers, addUser, updateUser, deleteUser, updateUserPoints,
} = require('../services/UserService');

const SUCCESS_CODES = {
  OK: 200,
  RESOURCE_CREATED: 201,
  NO_CONTENT_UPDATED: 204,
};

class UserController {
  async getUsers(req, res) {
    try {
      const resp = await getUsers();
      return res.json({ success: true, status: SUCCESS_CODES.OK, users: resp });
    } catch (err) {
      return res.json({ success: false, status: err.status, errorInfo: err });
    }
  }

  async addUser(req, res) {
    try {
      const resp = await addUser(req.body);
      if (resp.error) {
        throw resp;
      }
      const data = { success: true, status: SUCCESS_CODES.RESOURCE_CREATED, createdUser: resp[0] };
      return res.json(data);
    } catch (err) {
      return res.json({ success: false, status: err.status, errorInfo: err });
    }
  }

  async updateUser(req, res) {
    try {
      const resp = await updateUser(req.body, req.params.userId);
      if (resp.error) {
        throw resp;
      }
      const data = { success: true, status: resp.modifiedCount ? SUCCESS_CODES.OK : SUCCESS_CODES.NO_CONTENT_UPDATED, message: resp.modifiedCount ? 'User updated successfully' : 'No content updated' };
      return res.json(data);
    } catch (err) {
      return res.json({ success: false, status: err.status, errorInfo: err });
    }
  }

  async updateUserPoints(req, res) {
    try {
      const resp = await updateUserPoints(req.params.userId, req.query.action);
      if (resp.error) {
        throw resp;
      }
      const data = { success: true, status: resp.modifiedCount ? SUCCESS_CODES.OK : SUCCESS_CODES.NO_CONTENT_UPDATED, message: resp.modifiedCount ? 'User updated successfully' : 'No content updated' };
      return res.json(data);
    } catch (err) {
      return res.json({ success: false, status: err.status, errorInfo: err });
    }
  }

  async deleteUser(req, res) {
    try {
      const resp = await deleteUser(req.params.userId);
      if (resp.error) {
        throw resp;
      }
      const data = { success: true, status: resp.deletedCount ? SUCCESS_CODES.OK : SUCCESS_CODES.NO_CONTENT_UPDATED, message: resp.deletedCount ? 'User deleted successfully' : 'None of the user deleted' };
      return res.json(data);
    } catch (err) {
      return res.json({ success: false, status: err.status, errorInfo: err });
    }
  }
}

module.exports = new UserController();
