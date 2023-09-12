import { z } from "zod"

export interface CommentDeleteInputDTO {
    id: string,
    token: string
}

export const commentDeleteSchema = z.object({
    id: z.string({required_error: "'id' é obrigatória"}),
    token: z.string().min(2)
}).transform(data => data as CommentDeleteInputDTO)