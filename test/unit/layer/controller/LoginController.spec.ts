import {LoginController} from "../../../../src/layer/controller/LoginController";
import {UserService} from "../../../../src/layer/application/UserService";
import * as sinon from 'sinon';
import {NoSuchUserException} from "../../../../src/layer/domain/AuthenticationError";
import {UserRepository} from "../../../../src/layer/domain/UserRepository";
import * as assert from "assert";


describe('LoginController', function () {
    describe('login', function () {
        it('should return [404,No Such User] for non-existing-user when userService throws NoSuchUserException', function () {

            let userService = {
                authenticate: function() {
                    throw new NoSuchUserException("");
                }
            };

            let loginController = new LoginController(userService as unknown as UserService);

            let notRegisteredUsername = "NOT_REGISTERED";
            let req = { body: { username: notRegisteredUsername } };
            let res = {
                s: 0,
                obj: { message: '' },
                status: function(s) { this.s = s; },
                json: function(obj) { console.log('json'); this.obj = obj; },
                getStatus: function() { return this.s; }
            }

            loginController.login(req, res);

            assert.strictEqual(res.getStatus(), 404);
            assert.strictEqual(res.obj.message, "Not Registered : " + notRegisteredUsername);
        })
    })
})
