import {User} from "../domain/User"
import {UserRepository} from "../domain/UserRepository"

export class MemoryUserRepository implements UserRepository {
	userMap: Map<string,User> = new Map();
	failedLoginCounter: Map<string,number> = new Map();
	
	public save(user:User):User {
		this.userMap.set(user.username, user);
		return user;
	}
	
	public findByUsername(username:string ): User|undefined {
		return this.userMap.get(username);
	}

	public getFailedLoginCount(username: string): number {
		let failedLoginCount = this.failedLoginCounter.get(username);

		if ( !failedLoginCount )
			return 0;

		return failedLoginCount;
	}

	public saveFailedLoginCount(username: string, failedLoginCount: number): void {
		this.failedLoginCounter.set(username,failedLoginCount);
	}


}
