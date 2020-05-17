import {UserService} from "../service/UserService";

export class UserController {

	userService: UserService;
	
	constructor(userService: UserService) {
		this.userService = userService;
	}
	
    public create(req,res) {
		const createUserCommand = req.body;
		
        console.log('createUserCommand=' + JSON.stringify(createUserCommand));
		this.userService.createUser(createUserCommand);

        res.type("application/json");
        res.json({ name: 'jaehoon111' });
    }
}
