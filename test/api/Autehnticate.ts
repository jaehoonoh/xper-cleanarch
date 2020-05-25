import {app} from "../../src/layer/app";

const request = require('supertest');

describe ('Authentication', function () {
    it ('Should return [no such user] if there is no account', function() {
        request(app)
            .post('/login')
            .expect(404, {message: "no such user"})
            .end(function (err, res) {
                if (err) throw err;
            });
    });
});