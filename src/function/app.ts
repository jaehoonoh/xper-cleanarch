import {LoginController} from "./login/LoginController";
import {UserController} from "./user/UserController";
import {AuthService} from "./login/AuthService";
import {MemoryUserRepository} from "./user/MemoryUserRepository";

const express = require('express');
const app = express();

// Application Configuration
const userRepository = new MemoryUserRepository();
const authService = new AuthService(userRepository);
const loginController = new LoginController(authService);
const userController = new UserController();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.post('/users', function(req,res) {
    console.log('Hello2:' + req.body);
    userController.create(req,res);
});

app.listen(3000);

export { app };
