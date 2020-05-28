
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

export class PasswordIncorrectException implements Error {
    constructor(username:string) {
        this.message = "Incorrect Password: " + username;
        this.name = "IncorrectPassword";
        this.stack = (<any>new Error()).stack;
    }

    message: string;
    name: string;
    stack: string;
}
