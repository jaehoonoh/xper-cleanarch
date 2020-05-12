"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.create = function (req, res) {
        req.json;
        console.log('Body=' + req.body);
        res.type("application/json");
        res.json({ name: 'jaehoon111' });
    };
    return UserController;
}());
exports.UserController = UserController;
