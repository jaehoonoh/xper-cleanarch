import { User } from "../domain/User"
import { UserRepository } from "../domain/UserRepository"
import { SignupRequest, BaseResponse } from "./dto/SignUp";
import {NoSuchUserException, PasswordIncorrectException} from "../domain/AuthenticationError";

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
		const user : User|undefined = this.userRepository.findByUsername(username);
		if ( this.notFound(user) )
			throw new NoSuchUserException(username);

		if (this.isPasswordMatched(user, password)) {
			return true;
		}

		throw new PasswordIncorrectException(username);
	}

	private notFound(user: User | undefined) {
		return !user;
	}

	private isPasswordMatched(user:User|undefined, password) : boolean {
		if ( user ) {
			return user.password == password;
		}
		return false;
	}
}



