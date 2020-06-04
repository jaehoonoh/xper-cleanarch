import {User} from "./domain/User";

const express = require('express');
const app = express();

import { LoginController } from "./controller/LoginController";
import { UserController } from "./controller/UserController";
import { SignupController } from "./controller/SignupController";

import {UserService} from "./application/UserService";
import {UserRepository} from "./domain/UserRepository"
import {MemoryUserRepository} from "./infra/MemoryUserRepository"


// Application Configuration
const userRepository = new MemoryUserRepository();
const userService = new UserService(userRepository);

const loginController = new LoginController(userService);

export class LambdaUserService {
    private userPository: UserRepository;

    constructor(userPository: UserRepository) {
        this.userPository = userPository;
    }

    public createUser(username: string, password: string, confirmPassword: string) {
        let user = new User(username, password);

        let existingUser = userRepository.findByUsername(username);
        if ( existingUser )
            return false;

        userRepository.save(user);
        return true;
    }
}

const lambdaUserService = new LambdaUserService(userRepository);

export class LambdaUserController {
    private lambdaUserService: LambdaUserService;

    constructor(lambdaUserService: LambdaUserService) {
        this.lambdaUserService = lambdaUserService;
    }

    createUser(req: any, res: any) {
        let user = req.body;

        this.lambdaUserService.createUser(user.username, user.password, user.confirmPassword);

        res.json({ message: 'User created.'});
    }
}

const lambdaUserController = new LambdaUserController(lambdaUserService);

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

app.post('/lambda/users', (req,res) => {
    lambdaUserController.createUser(req,res);
})

export { app };
