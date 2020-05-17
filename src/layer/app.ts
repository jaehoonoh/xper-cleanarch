const express = require('express');
const app = express();

import { LoginController } from "./controller/LoginController";
import { UserController } from "./controller/UserController";
import { SignupController } from "./controller/SignupController";

const loginController = new LoginController();
const userController = new UserController();
const signupController = new SignupController();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/users', function (req, res) {
    console.log('Hello2:' + req.body);
    userController.create(req, res);
});

// TODO : 회원가입
app.post('/signup', (req, res) => {
    console.log("signup : " + req.body);
    signupController.create(req, res);
});

app.listen(3000);

export { app };
