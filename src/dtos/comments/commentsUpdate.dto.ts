import { z } from "zod"

export interface CommentUpdateInputDTO{
    id: string,
    content: string,
    token: string
}

export const commentUpdateSchema = z.object({
    id: z.string({
        required_error: "'id' é obrigatória",
      invalid_type_error: "'id' deve ser do tipo string"
    }),
    content: z.string({
        invalid_type_error: "'content' deve ser do tipo string"
    }),
    token: z.string().min(2)
}).transform(data => data as CommentUpdateInputDTO)