import {UserService} from "../application/UserService";

export class LoginController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public get(req,res) : string {
        return "/login";
    }

    login(req: any, res: any) {
        const user = req.body;

        this.userService.authenticate(user.username, user.password);

        res.status(404);
        res.json({});
    }
}
