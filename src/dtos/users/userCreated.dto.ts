import { z } from "zod"

export interface UserCreatedInputDTO {
    name: string,
    email: string,
    password: string,
}

export interface UserCreatedOutputDTO {
    message: string,
    token: string
}

export const userCreatedSchema = z.object({
    name: z.string({
        invalid_type_error: "'name' deve ser do tipo string"
    }).min(2),
    email: z.string({
        invalid_type_error: "'email' deve ser do tipo string"
    }).email("'email' invalido"),
    password: z.string({
        invalid_type_error: "'password' deve ser do tipo string"
    }).min(5),
}).transform(data => data as UserCreatedInputDTO)

