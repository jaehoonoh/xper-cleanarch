export interface UserRepository {
	save(user:User);
	findByUsername(username:string ): User;
}