import {UserRepository} from "../user/UserRepository";

export class AuthService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    authenticate(username: string) {
        this.userRepository.get(username);
    }
}
