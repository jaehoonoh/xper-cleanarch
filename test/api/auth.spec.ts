import { expect } from 'chai';
import { app } from '../../src/layer/app';

const request = require('supertest');

describe('Authentication', function() {
    it('a user should not be loggied in when there is no user account', function() {
        request(app)
            .post('/login')
            .send({username:'NOT_REGISTERED_USER', password: 'pw'})
            .expect(200,
                { message: 'No such user.'})
            .end(function (err,res) { if ( err ) throw err; });
    });
});
