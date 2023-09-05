import { z } from "zod"

export interface UserLoginInputDTO {
    email: string,
    password: string
}

export interface UserLoginOutputDTO {
    token: string
}

export const userLoginSchema = z.object({
    email: z.string({
        invalid_type_error: "'email' deve ser do tipo string"
    }).email("'email' invalido"),
    password: z.string({invalid_type_error: "'password' deve ser do tipo string"
}).min(5)
}).transform(data => data as UserLoginInputDTO)