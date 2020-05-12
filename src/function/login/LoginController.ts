import {AuthService} from "./AuthService";

export class LoginController {
    authService : AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    public login(req,res) {
        const username = req.param.username;

        this.authService.authenticate(username);
    }
}
