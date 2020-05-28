import {User} from "../domain/User"
import {UserRepository} from "../domain/UserRepository"
import {
	FailedLoginLimitExceedException,
	NoSuchUserException,
	PasswordIncorrectException
} from "../domain/AuthenticationError";

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



