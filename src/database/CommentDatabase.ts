import { CommentUserDB, CommentsDB } from "../types";
import { BaseDatabase } from "./Basedatabase";

export class CommentDatabase extends BaseDatabase {
    public static TABLE_COMMENTS = "comments"

    public async createComment(newComment: CommentsDB): Promise<CommentsDB[]> {
        const result: CommentsDB[] = await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).insert(newComment)
        return result
    }

    public async findComment(): Promise<CommentUserDB[]> {
        const result: CommentUserDB[] = await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).select(
            "comments.id",
            "comments.creator_id",
            "comments.content",
            "comments.like",
            "comments.dislike",
            "comments.created_at",
            "comments.updated_at",
            "users.id as userId",
            "users.name as userName",
            "post_id as postId"
        ).from("comments").innerJoin("users", "comments.creator_id", "users.id").innerJoin("post", "comments.post_id", "post.id")

        return result
    }

    public async findCommentById(id: string): Promise<CommentsDB | undefined> {
        const [result] = await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).where({ id })

        if (!result) {
            return undefined
        }

        const comment: CommentsDB = {
            id: result.id,
            post_id: result.post_id,
            creator_id: result.creator_id,
            content: result.comment,
            like: result.like,
            dislike: result.dislike,
            created_at: result.created_at,
            updated_at: result.updated_at
        }

        return comment
    }

    public async updateComment(id: string, content: string): Promise<void>{
        await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).update({content}).where({id})
    }

    public async deleteComment(id: string): Promise<void> {
        await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).del().where({id})
    }
}