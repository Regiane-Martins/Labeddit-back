import { PostDatabase } from "../database/PostDatabase";
import { PostCreateInputDTO } from "../dtos/posts/postCreate.dto";
import { PostDeleteInputDTO } from "../dtos/posts/postDelete.dto";
import { PostGetInputDTO, PostGetOutputDTO } from "../dtos/posts/postGet.dto";
import { PostUpdateInputDTO } from "../dtos/posts/postUpdate.tdo";
import { BadRequestError } from "../errors/BadRequestError";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { PostDB } from "../types";

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public create = async (input: PostCreateInputDTO): Promise<void> => {
        const id = this.idGenerator.generate()
        const { content, token } = input

        const result = this.tokenManager.getPayload(token)

        if (!result) {
            throw new BadRequestError("token invalido.")
        }

        const newPostDB: PostDB = {
            id,
            content,
            creator_id: result.id,
            likes: 0,
            dislikes: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }

        await this.postDatabase.createPost(newPostDB)

    }

    public getAll = async (input: PostGetInputDTO): Promise<PostGetOutputDTO[]> => {
        const { token } = input

        const isTokenValid = this.tokenManager.getPayload(token)

        if (!isTokenValid) {
            throw new BadRequestError("token invalido.")
        }

        const result = await this.postDatabase.findPost()
        
        const output: PostGetOutputDTO[] = result.map((post) => ({
            id: post.id,
            content: post.content,
            likes: post.likes,
            dislikes: post.dislikes,
            created_at: post.created_at,
            updated_at: post.updated_at,
            creator: {
                id: post.userId,
                name: post.userName
            }
        }))

        return output
    }

    public update = async(input: PostUpdateInputDTO): Promise<void> =>{
        const {id, content, token} = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("token invalido.")
        }

        const result = await this.postDatabase.findPostById(id)

        if(!id){
            throw new BadRequestError("'Id'não encontrado.")
        }

        if(payload.id !== result?.creator_id){
            throw new BadRequestError("'Id'inválido.")
        }

        await this.postDatabase.updatePost(id, content)

    }

    public delete = async(input: PostDeleteInputDTO): Promise<void> =>{
        const {id, token} = input

        const payload = this.tokenManager.getPayload(token)

        if(!payload){
            throw new BadRequestError("token inválido.")
        }

        const result = await this.postDatabase.findPostById(id)

        if(payload.id === result?.creator_id || payload.role === USER_ROLES.ADMIN){
            await this.postDatabase.deletePost(id)
        }else{
            throw new BadRequestError("acesso negado.")
        }
    }
}