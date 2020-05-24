const express = require('express');
const app = express();

import { LoginController } from "./controller/LoginController";
import { UserController } from "./controller/UserController";
import { SignupController } from "./controller/SignupController";

import {UserService} from "./application/UserService";
import {UserRepository} from "./domain/UserRepository"
import {MemoryUserRepository} from "./infra/MemoryUserRepository"


// Application Configuration

// DI
const userRepository = new MemoryUserRepository();
const userService = new UserService(userRepository);

const loginController = new LoginController();

const userController = new UserController(userService);
const signupController = new SignupController();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Controller URL Mapping
app.post('/users', function (req, res) {
    console.log('Hello2:' + req.body);
    userController.create(req, res);
});

// TODO : 회원가입
app.post('/signup', (req, res) => {
    console.log("signup : " + req.body);
    signupController.create(req, res);
});

app.post('/login', (req, res) => {
    console.log("login : " + JSON.stringify(req.body));
    loginController.login(req, res);
});

export { app };
