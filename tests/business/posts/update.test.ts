import { PostBusiness } from "../../../src/business/PostBusiness"
import { postUpdateSchema } from "../../../src/dtos/posts/postUpdate.tdo"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe("Testando método update", ()=>{
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Não deve retornar erro", async()=>{
        const input = postUpdateSchema.parse({
            id: "id-post-01",
            content: "Você consegue",
            token: "token-mock-fulano"
        })
        await expect(postBusiness.update(input)).resolves.not.toThrowError()
    })

    test("Deve retornar erro caso token seja invalido", async()=>{
        expect.assertions(1)
        try {
            const input = postUpdateSchema.parse({
                id: "id-post-01",
                content: "Você consegue",
                token: "mock-fulano"
            }) 

            await postBusiness.update(input)
        } catch (error) {
            if(error instanceof BadRequestError){
                expect(error.message).toEqual("token invalido.")
            }
        }
    })

    test("Deve retornar erro caso id não localizado", async()=>{
        expect.assertions(1)
        try {
            const input = postUpdateSchema.parse({
                id: "",
                content: "Você consegue",
                token: "token-mock-fulano"
            })
            await postBusiness.update(input)
        } catch (error) {
            if(error instanceof BadRequestError){
                expect(error.message).toEqual("'Id'não encontrado.")
            }
        }
    })

    test("Deve retornar erro caso id inválido", async()=>{
        expect.assertions(1)
        try {
            const input = postUpdateSchema.parse({
                id: "2",
                content: "Você consegue",
                token: "token-mock-fulano"
            })
            await postBusiness.update(input)
        } catch (error) {
            if(error instanceof BadRequestError){
                expect(error.message).toEqual("'Id'inválido.")
            }
        }
    })
})