import {UserService} from "../application/UserService";
import {NoSuchUserException} from "../domain/AuthenticationError";

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

        try {
            this.userService.authenticate(user.username, user.password);
        }
        catch ( err ) {
            console.log(err);
            if ( err instanceof NoSuchUserException ) {
                res.status(404);
                res.json({message: 'Not Registered : ' + user.username});
                return;
            }
        }

        res.status(200);
        res.json({ message: 'Succeed'});
    }
}
