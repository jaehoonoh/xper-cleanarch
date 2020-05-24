
export class NoSuchUserException extends Error {
    constructor(username:string) {
        super("No Such User: " + username);
    }
}

export class PasswordIncorrectException extends Error {
    constructor(username:string) {
        super("Incorrect Password: " + username);
    }
}
