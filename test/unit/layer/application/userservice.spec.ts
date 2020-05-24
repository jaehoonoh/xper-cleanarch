import { UserService } from "../../../../src/layer/application/UserService";
import {MemoryUserRepository} from "../../../../src/layer/infra/MemoryUserRepository";
import * as assert from "assert";

describe('UsserService', function() {
    describe('authenticate', function() {
        it('NoSuchUserException for non exiting user', function() {

            let userRepository = new MemoryUserRepository();
            const userService = new UserService(userRepository);

            assert.throws(() => { userService.authenticate("NOT_EXISTING_USER","password"); },
                Error("No Such User.")
                );
        })

        it("check only exception type", function() {
            //assert.throws(() => { throw Error("abc"); }, Error);
            function doSomething() {
                throw Error("abc");
            }

            assert.throws(doSomething, Error);
        });

        it("check exception type its message", function() {
            assert.throws(() => { throw Error(""); }, Error("abc"));
        });

        it("check exception and its message", function() {
            assert.throws(() => { throw Error("message"); }, Error("message"));
        });

        it("check exception and its message", function() {
            assert.throws(() => { throw Error("messageActual"); }, Error("messageExpected"));
        });

        it("exception", function() {
            assert.throws(() => { }, Error);
        });
    })
})
