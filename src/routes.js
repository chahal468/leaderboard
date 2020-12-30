const { Router } = require('express');
const UserController = require('./controllers/UserController');

const routes = new Router();

routes.get('/', UserController.getUsers);
routes.get('/api/v1/users', UserController.getUsers);
routes.post('/api/v1/addUser', UserController.addUser);
routes.put('/api/v1/user/:userId', UserController.updateUser);
routes.patch('/api/v1/user/:userId', UserController.updateUserPoints);
routes.delete('/api/v1/user/:userId', UserController.deleteUser);

module.exports = routes;
