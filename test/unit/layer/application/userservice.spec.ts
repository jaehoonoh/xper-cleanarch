import { UserService } from "../../../../src/layer/application/UserService";
import {MemoryUserRepository} from "../../../../src/layer/infra/MemoryUserRepository";
import * as assert from "assert";
import { NoSuchUserException, PasswordIncorrectException } from "../../../../src/layer/domain/AuthenticationError";

describe('UsserService', function() {
    describe('authenticate', function() {
        it('should throw NoSuchUserException for non exiting user', function() {

            let userRepository = new MemoryUserRepository();
            const userService = new UserService(userRepository);

            assert.throws(() => { userService.authenticate("NOT_EXISTING_USER","password"); },
                new NoSuchUserException("NOT_EXISTING_USER")
                );
        })

        it("should throw PasswordIncorrectException for incorrect password", function() {
            let userRepository = new MemoryUserRepository();
            const userService = new UserService(userRepository);

            let user = {username:"jaehoon", password: "password", confirmPassword: "password"};
            userService.createUser(user)

            assert.throws(() => { userService.authenticate("jaehoon","incorrect"); },
                new PasswordIncorrectException("jaehoon")
            );
        });

        it("should return true when username and password matched", function() {
            let userRepository = new MemoryUserRepository();
            const userService = new UserService(userRepository);

            let user = {username:"jaehoon", password: "password", confirmPassword: "password"};
            userService.createUser(user)

            const isAuthenticated = userService.authenticate("jaehoon","password");
            assert.strictEqual(true, isAuthenticated);
        });
    })
})
