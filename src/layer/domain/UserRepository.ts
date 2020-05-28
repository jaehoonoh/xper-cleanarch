import {User} from "./User";

// user repository
export interface UserRepository {
	save(user:User);
	findByUsername(username:string ): User|undefined;

	getFailedLoginCount(username: string): number;
	saveFailedLoginCount(username: string, failedLoginCount: number): void;
}
