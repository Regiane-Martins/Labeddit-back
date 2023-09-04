import { UserDB } from "../types";
import { BaseDatabase } from "./Basedatabase";

export class UserDatabase extends BaseDatabase{
    public static TABLE_USERS = "users"

    public async createUser(newUserDB: UserDB): Promise<void>{
        await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(newUserDB)
    }
}