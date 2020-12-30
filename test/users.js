/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');
const db = require('../src/database/users.js');

chai.should();
chai.use(chaiHttp);

const newUser = {
  _id: '23ce3a39-6479-43e9-ae1e-3677903ffcbd',
  name: 'Test',
  age: 20,
  points: 99,
  address: {
    line: 'lineTest',
    line2: 'line2 test',
    city: 'Surrey',
    zipcode: 'V4N 3C3',
    state: 'BC',
  },
};

describe('User APIs', () => {
  describe('-Test-', () => {
    before(async (done) => {
      await db.addNewUser(newUser);
      done();
    });

    after(async (done) => {
      await db.remove(newUser.id);
      done();
    });

    it('should return all users', (done) => {
      chai.request(server)
        .get('/api/v1/users')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('users');
          response.body.should.have.property('users').with.lengthOf(1);
          done();
        });
    });

    it('Should add a new user', (done) => {
      const data = {
        _id: '61c7d747-75e4-4d75-a754-f9b42b1945ba',
        name: 'Emma',
        age: 30,
        points: 25,
        address: {
          line: '15635',
          line2: '92 Ave',
          city: 'Surrey',
          zipcode: 'V4N 3C3',
          state: 'BC',
        },
      };
      chai.request(server)
        .post('/api/v1/addUser')
        .send(data)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('status').equal(201);
          response.body.should.have.property('createdUser');
          done();
        });
    });

    it('Should update the user', (done) => {
      chai.request(server)
        .put('/api/v1/user/61c7d747-75e4-4d75-a754-f9b42b1945ba')
        .send({ age: 22 })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('status').equal(200);
          response.body.should.have.property('message').eq('User updated successfully');
          done();
        });
    });

    it('Should update the points of a user', (done) => {
      chai.request(server)
        .patch('/api/v1/user/61c7d747-75e4-4d75-a754-f9b42b1945ba?action=-1')
        .query({ action: -1 })
        .end((eror1, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('status').equal(200);
          response.body.should.have.property('message').eq('User updated successfully');
          done();
        });
    });

    it('should check count and user(s) info after previous update and patch operations', (done) => {
      chai.request(server)
        .get('/api/v1/users')
        .end((err, response) => {
          const { users } = response.body;
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('users');
          response.body.should.have.property('users').with.lengthOf(2);
          users[1].should.have.property('age').eq(22); // PUT correctly updated age
          users[1].should.have.property('points').eq(24); // PATCH cprectly updated points
          done();
        });
    });

    it('should delete a user', (done) => {
      chai.request(server)
        .delete('/api/v1/user/61c7d747-75e4-4d75-a754-f9b42b1945ba')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('status').equal(200);
          response.body.should.have.property('message').eq('User deleted successfully');
          done();
        });
    });

    it('should check users count after deletion', (done) => {
      chai.request(server)
        .get('/api/v1/users')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('users');
          response.body.should.have.property('users').with.lengthOf(1);
          done();
        });
    });
  });
});

// Please ignore below test data
/*
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
