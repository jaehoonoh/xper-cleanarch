import {LoginController} from "../../../../src/layer/controller/LoginController";
import {UserService} from "../../../../src/layer/application/UserService";
import * as sinon from 'sinon';
import {NoSuchUserException, PasswordIncorrectException} from "../../../../src/layer/domain/AuthenticationError";
import {UserRepository} from "../../../../src/layer/domain/UserRepository";
import * as assert from "assert";


describe('LoginController', function () {
    describe('login', function () {
        it('should return [404,No Such User] for non-existing-user when userService throws NoSuchUserException', function () {
            let userService = { authenticate: function() { throw new NoSuchUserException(""); } };
            let loginController = new LoginController(userService as unknown as UserService);

            let notRegisteredUsername = "NOT_REGISTERED";
            let req = makeFakeRequest(notRegisteredUsername);
            let res = makeFakeResponse();

            loginController.login(req, res);

            assert.strictEqual(res.getStatus(), 404);
            assert.strictEqual(res.obj.message, "Not Registered : " + notRegisteredUsername);
        })

        it('should return [400,Incorrect Password] for Incorrect Password Login', function () {

            let userService = { authenticate: function() { throw new PasswordIncorrectException(""); } };
            let loginController = new LoginController(userService as unknown as UserService);

            let req = makeFakeRequest("");
            let res = makeFakeResponse();

            loginController.login(req, res);

            assert.strictEqual(res.getStatus(), 400);
            assert.strictEqual(res.obj.message, "Incorrect Password");
        })

        it('should return [200,Succeed] when Login succeeds', function () {
            let userService = { authenticate: function() { return true; } };
            let loginController = new LoginController(userService as unknown as UserService);

            let req = makeFakeRequest("");
            let res = makeFakeResponse()

            loginController.login(req, res);

            assert.strictEqual(res.getStatus(), 200);
            assert.strictEqual(res.obj.message, "Succeed");
        })

        function makeFakeResponse() {
            return {
                s: 0,
                obj: {message: ''},
                status: function (s) {
                    this.s = s;
                },
                json: function (obj) {
                    console.log('json');
                    this.obj = obj;
                },
                getStatus: function () {
                    return this.s;
                }
            };
        }

        function makeFakeRequest(notRegisteredUsername: string) {
            return {body: {username: notRegisteredUsername}};
        }
    })
})
