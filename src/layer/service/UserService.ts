import { User } from "../domain/User.ts"
import UserRepository from "../infra/UserRepository.ts"

export class UserService {
	userRepository:UserRepository;
	
	constructor(userRepository:UserRepository) {
		this.userRepository = userRepository;	
	}
	
	public createUser(createUserCommand:any):User {
		this.validateSamePassword(createUserCommand);
		this.validateUserAlreadyExist(createUserCommand);
		
		this.userRepository.save(new User(createUserCommand.username, createUserCommand.password))
	}
	
	private validateSamePassword(createUserCommand:any) {
		if ( createUserCommand.password != createUserCommand.confirmPassword ) {
			throw Error("Password doesn't match confirmPassword.");
		}
	}
	
	
	private validateUserAlreadyExist(createUserCommand:any) {
		// ??
	}
	
}



