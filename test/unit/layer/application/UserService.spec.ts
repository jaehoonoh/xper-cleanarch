import * as assert from "assert";
import {
    IncorrectPasswordException,
    NoSuchUserException,
    UserService
} from "../../../../src/layer/application/UserService";
import {MemoryUserRepository} from "../../../../src/layer/infra/MemoryUserRepository";

describe('UserService', function () {
    describe('authenticate', function () {
        let userRepository;
        let userService;
        before('setUp', function() {
            console.log('Before');
        });
        beforeEach (function () {
            console.log('BeforeEach');
            userRepository = new MemoryUserRepository();
            userService = new UserService(userRepository);
        })
        it('should throw NoSuchIserException for non-existing-user', function () {
            //Arrange

            //Act
            //Assert
            let username = "NON_EXISTING_USER";
            let password = "PASSWORD";
            assert.throws(function () {
                userService.authenticate(username,password);
            }, new NoSuchUserException(username));
        });
        it('should throw NoSuchIserException for non-existing-user', function () {
            //Arrange
            //Act
            //Assert
            let username = "NON_EXISTING_USER";
            let password = "PASSWORD";

            let createUserCommand = {username: username, password: password, confirmPassword: password };
            userService.createUser(createUserCommand);
            assert.throws(function () {
                userService.authenticate(username, "INCORRECT_PASSWORD");
            }, new IncorrectPasswordException(username));
        });
        it('should return true  for non-existing-user', function () {
            //Arrange
            let username = "NON_EXISTING_USER";
            let password = "PASSWORD";
            let correctPassword = password;
            let createUserCommand = {username: username, password: password, confirmPassword: password };
            userService.createUser(createUserCommand);
            //Act
            const isAuthenticated = userService.authenticate(username, correctPassword);
            //Assert
            assert.strictEqual(isAuthenticated, true);
        });
    })
})