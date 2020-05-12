"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
exports.app = app;
var LoginController_1 = require("./controller/LoginController");
var UserController_1 = require("./controller/UserController");
var loginController = new LoginController_1.LoginController();
var userController = new UserController_1.UserController();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.post('/users', function (req, res) {
    console.log('Hello2:' + req.body);
    userController.create(req, res);
});
app.listen(3000);
