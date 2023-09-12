import { BaseDatabase } from "../../src/database/Basedatabase";
import { USER_ROLES } from "../../src/models/User";
import { UserDB } from "../../src/types";

const usersMocks: UserDB[] = [
    {
        id: "id-mock-fulano",
        name: "Fulano",
        email: "fulano@email.com",
        password: "hash-mock-fulano",
        role: USER_ROLES.NORMAL,
        created_at: new Date().toISOString()
        
    },

    {
        id: "id-mock-ciclano",
        name: "Ciclano",
        email: "ciclano@email.com",
        password: "hash-mock-ciclano",
        role: USER_ROLES.ADMIN,
        created_at: new Date().toISOString() 
    }

]


export class UserDatabaseMock extends BaseDatabase{
    public static TABLE_USERS = "users"

    public async createUser(newUserDB: UserDB): Promise<void>{
    }

    public async findUserByEmail(email: string): Promise<UserDB>{
        return usersMocks.filter((user)=> user.email === email)[0]
    }

    public async findUser(): Promise<UserDB[]>{
       return usersMocks
    }
}