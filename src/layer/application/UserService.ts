import {User} from "../domain/User"
import {UserRepository} from "../domain/UserRepository"
import {
	FailedLoginLimitExceedException,
	NoSuchUserException,
	PasswordIncorrectException
} from "../domain/AuthenticationError";

export class UserAlradyExistException implements Error {
	private username: string;

	constructor(username: string) {
		this.name = UserAlradyExistException.name;
		this.message = "UserAlreadyExistException"
		this.username = username;
	}

	message: string;
	name: string;
}

export class PasswordNotMatchedException implements Error {
	private username: string;

	constructor(username: string) {
		this.name = PasswordNotMatchedException.name;
		this.message = "";
		this.username = username;
	}

	message: string;
	name: string;
}

export class UserService {
	userRepository:UserRepository;
	
	constructor(userRepository:UserRepository) {
		this.userRepository = userRepository;	
	}
	
	public createUser(createUserCommand:any) {
		this.validateSamePassword(createUserCommand);
		this.validateUserAlreadyExist(createUserCommand);

		let user = this.userRepository.findByUsername(createUserCommand.username);
		if ( user ) {
			throw new UserAlradyExistException(createUserCommand.username);
		}

		this.userRepository.save(new User(createUserCommand.username, createUserCommand.password))
	}
	
	private validateSamePassword(createUserCommand:any) {
		if ( this.passwordIsEqualToConfirmPassword(createUserCommand) ) {
			throw new PasswordNotMatchedException(createUserCommand.username);
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

	public authenticate(username: string, password: string) : boolean {
		const user : User|undefined = this.userRepository.findByUsername(username);
		if ( !user )
			throw new NoSuchUserException(username);

		if (!user.isPasswordMatched(password)) {
			this.increaseFailedLoginCount(username);
			let failedLoginCount = this.getFailedLoginCount(username);

			if ( failedLoginCount > 3 ) {
				throw new FailedLoginLimitExceedException(username, failedLoginCount);
			}

			throw new PasswordIncorrectException(username, failedLoginCount);
		}

		this.resetFailedLoginCountFor(username);
		return true;
	}

	private resetFailedLoginCountFor(username: string) {
		this.userRepository.saveFailedLoginCount(username, 0);
	}

	private increaseFailedLoginCount(username: string) {
		let failedLoginCount = this.getFailedLoginCount(username);
		failedLoginCount = failedLoginCount + 1;
		this.userRepository.saveFailedLoginCount(username,failedLoginCount);
	}

	public getFailedLoginCount(username: string) : number {
		return this.userRepository.getFailedLoginCount(username);
	}
}



