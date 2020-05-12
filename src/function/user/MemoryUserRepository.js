"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MemoryUserRepository = /** @class */ (function () {
    function MemoryUserRepository() {
    }
    MemoryUserRepository.prototype.get = function (username) {
        return this.userMap.get(username);
    };
    MemoryUserRepository.prototype.save = function (user) {
        this.userMap.set(user.username, user);
    };
    return MemoryUserRepository;
}());
exports.MemoryUserRepository = MemoryUserRepository;
