import {
    PasswordNotMatchedException,
    UserAlradyExistException,
    UserService
} from "../../../../src/layer/application/UserService";
import {MemoryUserRepository} from "../../../../src/layer/infra/MemoryUserRepository";
import * as assert from "assert";
import {
    FailedLoginLimitExceedException,
    NoSuchUserException,
    PasswordIncorrectException
} from "../../../../src/layer/domain/AuthenticationError";


describe('UsserService', function () {
    let userService: UserService;
    let userRepository: MemoryUserRepository;

    beforeEach(function () {
        userRepository = new MemoryUserRepository();
        userService = new UserService(userRepository);
    });

    describe('createUser', function () {
        it('should throw PasswordNotMatchedException when password and confirmPassword not matched', function () {
            let username = "jaehoon";
            let user = {username: username, password: "password", confirmPassword: "notMatchedWithPassword"};

            assert.throws( () => { userService.createUser(user); },
                { name: PasswordNotMatchedException.name, username: username }
            );
        })

        it('should succeed when user not already registered and password=confirmPassword', function () {
            let username = "jaehoon";
            let user = {username: username, password: "password", confirmPassword: "password"};

            userService.createUser(user);
        })

        it('should throw UserAlreadyExistException when try to add existing username', function () {
            let username = "jaehoon";
            let user = {username: username, password: "password", confirmPassword: "password"};

            userService.createUser(user);

            assert.throws( () => { userService.createUser(user); },
                { name: UserAlradyExistException.name, username: username }
            );
        })
    });

    describe('authenticate', function () {
        it('should throw NoSuchUserException for non exiting user', function () {
            let notexistinguser = "NOT_EXISTING_USER";

            assert.throws(() => { userService.authenticate(notexistinguser, "password"); },
                {name: NoSuchUserException.name, username: notexistinguser}
            );
        })

        it("should throw PasswordIncorrectException for incorrect password", function () {
            let username = "jaehoon";
            let user = {username: username, password: "password", confirmPassword: "password"};
            userService.createUser(user)

            assert.throws(() => {
                    userService.authenticate(username, "incorrect");
                },
                {name: PasswordIncorrectException.name, username: username, failedLoginCount: 1}
            );
        });

        it("should return true when username and password matched", function () {
            let user = {username: "jaehoon", password: "password", confirmPassword: "password"};
            userService.createUser(user)

            const isAuthenticated = userService.authenticate("jaehoon", "password");

            assert.strictEqual(true, isAuthenticated);
        });

        it("should throw LoginFailedLimitExceedException when login failed more than three times", function () {
            let username = "jaehoon";
            let user = {username: username, password: "password", confirmPassword: "password"};
            userService.createUser(user)

            userFailedToLoginThreeTimes(username);

            assert.throws(() => {
                    userService.authenticate(username, "incorrect");
                },
                {name: FailedLoginLimitExceedException.name, username: username}
            );
        })

        it("should reset failedLoginCount when login succeeded after FailedLoginCount exceed the limit", function () {
            let username = "jaehoon";
            let user = {username: username, password: "password", confirmPassword: "password"};
            userService.createUser(user)

            afterFailedLoginLimitExceededFor(username);

            // Arrange - When
            userService.authenticate(username, "password");

            let failedLoginCount = userService.getFailedLoginCount(username);
            assert.strictEqual(failedLoginCount, 0);
        })

        function userFailedToLoginThreeTimes(username: string) {
            try { userService.authenticate(username, "incorrect"); } catch ( err ) {}
            try { userService.authenticate(username, "incorrect"); } catch ( err ) {}
            try { userService.authenticate(username, "incorrect"); } catch ( err ) {}
        }

        function afterFailedLoginLimitExceededFor(username: string) {
            try { userService.authenticate(username, "incorrect"); } catch ( err ) {}
            try { userService.authenticate(username, "incorrect"); } catch ( err ) {}
            try { userService.authenticate(username, "incorrect"); } catch ( err ) {}
            try { userService.authenticate(username, "incorrect"); } catch ( err ) {}
        }
    })


})
