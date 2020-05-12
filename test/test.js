"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var app_1 = require("../src/layer/app");
var request = require('supertest');
describe('First ', function () {
    it('register user', function () {
        request(app_1.app).post('/users')
            .send({ username: 'user01', password: 'pw', confirm: 'pw' })
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .type('application/json')
            .end(function (err, res) { if (err)
            throw err; });
    });
    it('boolean', function () {
        chai_1.expect(true).to.equal(true);
    });
    it('/hello', function () {
        request(app_1.app).get('/hello').expect(200).end(function (err, res) { if (err)
            throw err; });
    });
    it('/login', function () {
        request(app_1.app).get('/login')
            .expect(200)
            .expect('/login')
            .end(function (err, res) { if (err)
            throw err; });
    });
});
