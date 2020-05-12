import {UserRepository} from "./UserRepository";
import {User} from "./User";

export class MemoryUserRepository implements UserRepository {
    userMap: Map<string,User>;

    get(username: string): User {
        return this.userMap.get(username);
    }

    save(user: User) {
        this.userMap.set(user.username, user);
    }

}
