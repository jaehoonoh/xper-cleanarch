import {LambdaUserService} from "../../../src/layer/app";
import * as assert from "assert";
import {MemoryUserRepository} from "../../../src/layer/infra/MemoryUserRepository";

describe('LambdaUserService', function () {
    describe('creatUser', function () {
        it('should return true when a new user created succsssfully', function () {
            // Arrange
            let userRepository = new MemoryUserRepository();
            let lambdaUserService = new LambdaUserService(userRepository);

            // Act
            let isCreated = lambdaUserService.createUser('aNewUser', 'password', 'password');

            // Assert
            assert.strictEqual(true, isCreated);
        })

        it('should return fale when a new user already exists', function () {
            // Arrange
            let userRepository = new MemoryUserRepository();
            let lambdaUserService = new LambdaUserService(userRepository);

            lambdaUserService.createUser('aNewUser', 'password', 'password');

            // Act
            let isCreated = lambdaUserService.createUser('aNewUser', 'password', 'password');

            // Assert
            assert.strictEqual(false, isCreated);
        })

    })

})
