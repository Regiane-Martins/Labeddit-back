import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { commentUpdateSchema } from "../../../src/dtos/comments/commentsUpdate.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { CommentDatabaseMock } from "../../mocks/CommentDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe("Testando método updateComment", ()=>{
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Não deve retornar erro ao atualizar comentário", async()=>{
        const input = commentUpdateSchema.parse({
            id: "id-com-01",
            content: "atualização",
            token: "token-mock-ciclano"
        })

        await expect(commentBusiness.update(input)).resolves.not.toThrowError()
    })

    test("Deve retornar erro caso token inválido", async()=>{
        expect.assertions(1)
        try {
            const input = commentUpdateSchema.parse({
                id: "id-com-01",
                content: "atualização",
                token: "token-ciclano"
            })

            await commentBusiness.update(input)
        } catch (error) {
            if(error instanceof BadRequestError){
                expect(error.message).toEqual("token inválido.")
            }
        }
    })

    test("Deve retornar erro caso id não encontrado", async()=>{
        expect.assertions(1)
        try {
            const input = commentUpdateSchema.parse({
                id: "id-com-005",
                content: "atualização",
                token: "token-mock-ciclano"
            })
            await commentBusiness.update(input);
            
        } catch (error) {
            if(error instanceof NotFoundError){
                expect(error.message).toEqual("'Id'não localizado.")
            }
        }
    })

    test("Deve retornar erro caso id inválido", async()=>{
        expect.assertions(1)
        try {
            const input = commentUpdateSchema.parse({
                id: "id-com-01",
                content: "atualização",
                token: "token-mock-fulano"
            })
            await commentBusiness.update(input);
            
        } catch (error) {
            console.log(error);
            
            if(error instanceof BadRequestError){
                expect(error.message).toEqual("'Id'inválido")
            }
        }
    })
})