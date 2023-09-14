import { BaseDatabase } from '../../src/database/Basedatabase'
import { LikeDislikeDB, PostDB, PostUserDB} from '../../src/types'

const postMocks: PostDB[] =[ 
    {
    id: "id-post-01",
    creator_id: "id-mock-fulano",
    content: "olá",
    likes: 0,
    dislikes: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
    },

    {
        id: "id-post-02",
        creator_id: "id-mock-ciclano",
        content: "oi",
        likes: 0,
        dislikes: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
        }
]

const userMock = [{
    id: "u001",
    name: "fulano"
}]

const likesDislikesMock = [
    {
        post_id: "xxxxx",
        user_id: "zzzzz",
        like: 1
    }
]

export class PostDatabaseMock extends BaseDatabase{
    public static TABLE_POST = "post"

    public async findPostById(id: string): Promise<PostDB | undefined>{
        return postMocks.find( post => post.id == id)            
    }

    public async createPost(newPostDB: PostDB): Promise<PostDB[]> {
        return [newPostDB]
    }

    public async findPost(): Promise<PostUserDB[]>{
        const result: PostUserDB[] = postMocks.map( post => { 

            const user = userMock.find( user => user.id === post.creator_id)
            const newPost = {
                id: post.id,
                creator_id: post.creator_id,
                content: post.content,
                likes: post.likes,
                dislikes: post.dislikes,
                created_at: post.created_at,
                updated_at: post.updated_at,
                userId: user?.id as string,
                userName: user?.name as string
            }
            return newPost
        })
        return result
    }

    public async updatePost(id: string, content: string): Promise<void>{
    }

    public async deletePost(id: string): Promise<void> {
    }
    

    public async findLikeDislike(postId: string, userId: string): Promise<LikeDislikeDB>{
        const [result]: LikeDislikeDB[]=  likesDislikesMock.
        filter( like => like.user_id == userId && like.post_id== postId)        
        return result
     }


     public async createLikeDislike(likeDislikeDB:LikeDislikeDB): Promise<void>{
       
    }

    public async deleteLikeDislike(postId: string, userId: string): Promise<void>{
        
    }

    public async incrementLike(postId: string): Promise<void>{
        
    }

    public async decrementLike(postId: string): Promise<void>{
        
    }

    public async incrementDislike(postId: string): Promise<void>{
        
    }

    public async decrementDislike(postId: string): Promise<void>{
        
    }

    public async revertLikeToDislike(postId: string): Promise<void>{
       
    }

    public async revertDislikeToLike(postId: string): Promise<void>{

    }
}