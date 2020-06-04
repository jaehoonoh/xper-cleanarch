import {app} from '../../src/layer/app';

const request = require('supertest');

describe('user registration', function () {
    it('a new user should register when there is no user with same username', function () {
        request(app)
            .post('/lambda/users')
            .send({ username: 'newUser', password: 'pw', confirmPassword: 'pw'})
            .expect(200, { message: 'User created.'})
            .end(function(err,res) { if ( err ) throw err; });
    });

})
