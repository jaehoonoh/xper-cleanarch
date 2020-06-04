import {UserService} from "../application/UserService";
import {
    FailedLoginLimitExceedException,
    NoSuchUserException,
    PasswordIncorrectException
} from "../domain/AuthenticationError";

export class LoginController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public get(req,res) : string {
        return "/login";
    }

    public login(req: any, res: any) {
        const user = req.body;

        try {
            this.userService.authenticate(user.username, user.password);
        }
        catch ( err ) {
            if ( err instanceof NoSuchUserException ) {
                res.status(404);
                res.json({message: 'Not Registered : ' + user.username});
                return;
            }
            if ( err instanceof PasswordIncorrectException) {
                res.status(400);
                res.json({ message: 'Incorrect Password'});
                return;
            }
            if ( err instanceof FailedLoginLimitExceedException ) {

            }
        }

        res.status(200);
        res.json({ message: 'Succeed'});
    }
}
