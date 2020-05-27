export class User {
    public username: string;
    public password: string;
	
	constructor(username:string, password:string) {
		this.username = username;
		this.password = password;
	}

	public isPasswordMatched(password) : boolean {
		return this.password == password;
	}
}
