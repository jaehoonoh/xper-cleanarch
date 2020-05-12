import {User} from "./User";

export interface UserRepository {
    save(user: User);
    get(username:string) :User;
}
