import { User } from "../domain/User"
import { UserRepository } from "../domain/UserRepository"
import { SignupRequest, BaseResponse } from "./dto/SignUp";

export class NoSuchUserException extends Error {
	constructor(username: string) {
		super("No Such User: " + username);
	}
}

export class IncorrectPasswordException extends Error {
	constructor(username: string) {
		super("Incorrected" + username);
	}
}

export class UserService {
	userRepository:UserRepository;
	
	constructor(userRepository:UserRepository) {
		this.userRepository = userRepository;	
	}
	
	public createUser(createUserCommand:any) {
		this.validateSamePassword(createUserCommand);
		this.validateUserAlreadyExist(createUserCommand);
		
		this.userRepository.save(new User(createUserCommand.username, createUserCommand.password))
	}
	
	private validateSamePassword(createUserCommand:any) {
		if ( this.passwordIsEqualToConfirmPassword(createUserCommand) ) {
			throw Error("Password doesn't match confirmPassword.");
		}
	}

	private passwordIsEqualToConfirmPassword(createUserCommand: any) {
		return createUserCommand.password != createUserCommand.confirmPassword;
	}

	private validateUserAlreadyExist(createUserCommand:any) {
		const user = this.userRepository.findByUsername(createUserCommand.username);
		if ( user != undefined ) {

		}
	}

	authenticate(username: string, password: string) : boolean {
		const user = this.userRepository.findByUsername(username);
		if (!user)
			throw new NoSuchUserException(username);
		if (user.password != password)
			throw new IncorrectPasswordException(username);

		return true;
	}
	
}



