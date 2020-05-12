const express = require('express');
const app = express();

import { LoginController } from "./controller/LoginController";
import {UserController} from "./controller/UserController";

const loginController = new LoginController();
const userController = new UserController();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.post('/users', function(req,res) {
    console.log('Hello2:' + req.body);
    userController.create(req,res);
});

app.listen(3000);

export { app };
