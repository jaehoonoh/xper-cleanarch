const express = require('express');
const app = express();

import { LoginController } from "./controller/LoginController";
import {UserController} from "./controller/UserController";

import {UserService} from "./application/UserService";
import {UserRepository} from "./domain/UserRepository"
import {MemoryUserRepository} from "./infra/MemoryUserRepository"


const userRepository = new MemoryUserRepository();
const userService = new UserService(userRepository);

const loginController = new LoginController();
const userController = new UserController(userService);

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.post('/users', function(req,res) {
    console.log('Hello2:' + req.body);
    userController.create(req,res);
});

app.listen(3000);

export { app };
