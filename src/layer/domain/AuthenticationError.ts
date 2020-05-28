
export class NoSuchUserException implements Error {
    constructor(username:string) {
        this.message = "No Such User";
        this.username = username;
        this.name = NoSuchUserException.name;
        this.stack = (<any>new Error()).stack;
    }

    message: string;
    name: string;
    private username: string;
    stack: string;
}

export class PasswordIncorrectException implements Error {
    private failedLoginCount: number;
    constructor(username:string, failedLoginCount: number) {
        this.username = username;
        this.failedLoginCount = failedLoginCount;
        this.message = "Incorrect Password";
        this.name = PasswordIncorrectException.name;
        this.stack = (<any>new Error()).stack;
    }

    private username: string;
    message: string;
    name: string;
    stack: string;
}

export class FailedLoginLimitExceedException implements Error {
    constructor(username: string, failedLoginCount: number) {
        this.username = username;
        this.failedLoginCount = failedLoginCount;
        this.name = FailedLoginLimitExceedException.name;
        this.message = "FaildLogin count exceeds limit"
    }

    message: string;
    private username: string;
    private failedLoginCount: number;
    name: string;
}
