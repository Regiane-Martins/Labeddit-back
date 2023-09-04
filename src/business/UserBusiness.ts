import { UserDatabase } from "../database/UserDatabase";
import { UserCreatedInputDTO, UserCreatedOutputDTO } from "../dtos/users/userCreated.dto";
import { IdGenerator } from "../services/IdGenerator";
import {HashManager} from '../services/HashManager'
import { USER_ROLES, User } from "../models/User";
import { UserDB } from "../types";
import { TokenManager, TokenPayload } from "../services/TokenManager";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private tokenManager: TokenManager
    ){}

    public insertUser = async(input: UserCreatedInputDTO): Promise<UserCreatedOutputDTO> =>{
       const {name, email, password} = input

       const id = this.idGenerator.generate()
       const hashedPassword = await this.hashManager.hash(password)

       const newUser = new User(
        id,
        name,
        email,
        hashedPassword,
        USER_ROLES.NORMAL,
        new Date().toISOString()    
       )

       const newUserDB: UserDB = {
        id: newUser.getId(),
        name: newUser.getName(),
        email: newUser.getEmail(),
        password: newUser.getPassword(),
        role: USER_ROLES.NORMAL,
        created_at: newUser.getCreatedAt()
       }

       await this.userDatabase.createUser(newUserDB)

       const tokenPayload: TokenPayload = {
        id: newUser.getId(),
        name: newUser.getName(),
        role: newUser.getRole()
       }

       const token = this.tokenManager.createToken(tokenPayload)

       const output: UserCreatedOutputDTO = {
        message: "Usuário cadastrado com sucesso.",
        token: token
       }
       return output

    }
}