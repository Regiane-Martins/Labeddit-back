import { CommentDatabase } from "../database/CommentDatabase";
import { CommentCreateInputDTO } from "../dtos/comments/commentsCreate.dto";
import { CommentDeleteInputDTO } from "../dtos/comments/commentsDelete.dto";
import { CommentGetInputDTO, CommentsGetOutputDTO } from "../dtos/comments/commentsGet.dto";
import { CommentUpdateInputDTO } from "../dtos/comments/commentsUpdate.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { CommentsDB } from "../types";

export class CommentBusiness {
    constructor(
        private commentDatabase: CommentDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public create = async (input: CommentCreateInputDTO): Promise<void> => {
        const id = this.idGenerator.generate()
        const {post_id, content, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("token invalido")
        }

        if(!post_id){
            throw new BadRequestError("Post não encontrado.")
        }

        const newComment: CommentsDB = {
            id,
            post_id,
            creator_id: payload.id,
            content,
            like:0,
            dislike: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }

        await this.commentDatabase.createComment(newComment)
    }

    public get = async(input: CommentGetInputDTO): Promise<CommentsGetOutputDTO[]> =>{
        const {token} = input

        const payload = this.tokenManager.getPayload(token)

        if(!payload){
            throw new BadRequestError("token invalido.")
        }

        const result = await this.commentDatabase.findComment()

        const output: CommentsGetOutputDTO[] = result.map((comment)=>({
            id: comment.id,
            content: comment.content,
            likes: comment.like ,
            dislikes: comment.dislike ,
            created_at: comment.created_at ,
            updated_at:comment.updated_at ,
            creator: {
                id: comment.userId,
                post_id: comment.postId,
                name: comment.userName
            }
        }))

        return output
    }

    public update = async(input: CommentUpdateInputDTO): Promise<void> =>{
        const {id, content, token} = input

        const payload = this.tokenManager.getPayload(token)
        if(!payload){
            throw new BadRequestError("token inválido.")
        }

        const result = await this.commentDatabase.findCommentById(id)
        if(!result){
            throw new NotFoundError("'Id'não localizado.")
        }

        if(payload.id !== result.creator_id){
            throw new BadRequestError("'Id'inválido")
        }

        await this.commentDatabase.updateComment(id, content)
    }

    public delete = async(input: CommentDeleteInputDTO)=>{
        const {id, token} = input

        const payload = this.tokenManager.getPayload(token)
        if(!payload){
            throw new BadRequestError("token inválido.")
        }

        const result = await this.commentDatabase.findCommentById(id)
        if(!result){
            throw new NotFoundError("'Id'não localizado.")
        }

        if(payload.id === result.creator_id || payload.role === USER_ROLES.ADMIN){
            await this.commentDatabase.deleteComment(id)
        }else{
            throw new BadRequestError("acesso negado.")
        }
    }
}