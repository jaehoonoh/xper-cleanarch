import {UserService} from "../application/UserService";

export class LoginController {
    private userService: UserService

    constructor(userService: UserService) {
        this.userService = userService
    }

    login(req: any, res: any) {
        res.status(200);
        let username : string = req.body.username;
        let password : string = req.body.password;

        this.userService.authenticate(username, password);
        res.json({});
    }
    public get(req,res) : string {
        return "/login";
    }
}
