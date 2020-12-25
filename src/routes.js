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

/**
 *
 * 61c7d747-75e4-4d75-a754-f9b42b1945ba
 * 4c701855-cf0d-45f8-8735-5addc865296c
 * 0dccfef2-58fe-4947-a7d4-637780075936
 * cc527440-8434-4c33-a951-39f75307cdd4
 * ff8dc8b1-90c7-4290-9282-3519eef65741
 * 23ce3a39-6479-43e9-ae1e-3677903ffcbd

 {
  "_id": "61c7d747-75e4-4d75-a754-f9b42b1945ba",
  "name": "Emma",
  "age": 30,
  "points": 25,
  "address": {
    "line": "15635",
    "line2": "92 Ave",
    "city": "Surrey",
    "zipcode": "V4N 3C3",
    "state": "BC"
  }
}
 
 */
