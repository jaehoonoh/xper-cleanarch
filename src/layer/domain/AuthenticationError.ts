
export class NoSuchUserException implements Error {
    constructor(username:string) {
        this.message = "No Such User: " + username;
        this.name = "NoSuchUserException";
        this.stack = (<any>new Error()).stack;
    }

    message: string;
    name: string;
    stack: string;
}

export class PasswordIncorrectException extends Error {
    constructor(username:string) {
        super("Incorrect Password: " + username);
    }
}
