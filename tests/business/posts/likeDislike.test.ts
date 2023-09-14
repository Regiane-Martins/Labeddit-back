import { PostBusiness } from "../../../src/business/PostBusiness"
import { likeDislikeSchema } from "../../../src/dtos/posts/postLikeDislike.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe("Testando método likeDislike", ()=>{
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Deve dar erro caso token inválido", async()=>{
        expect.assertions(1)
        try {
            const input = likeDislikeSchema.parse({
                id: "id-post-01",
                like: false,
                token: "token-ciclano"
            })
            await postBusiness.likeDislike(input)
        } catch (error) {
            console.log(error);
            if(error instanceof BadRequestError){
                expect(error.message).toEqual("token invalido.")
            }
        }  
    })

    test("Deve retornar erro caso post não seja localizado", async()=>{
        expect.assertions(1)
        try {
            const input = likeDislikeSchema.parse({
                id: "id-post",
                like: false,
                token: "token-mock-ciclano"
            })
            await postBusiness.likeDislike(input)
        } catch (error) {
            console.log(error);
            if(error instanceof BadRequestError){
                expect(error.message).toEqual("Post não localizado.")
            }
        }  
    })

    test("Deve retornar erro caso a propria pessoa curta seu comentário", async()=>{
        expect.assertions(1)
        try {
            const input = likeDislikeSchema.parse({
                id: "id-post-01",
                like: true,
                token: "token-mock-fulano"
            })
            await postBusiness.likeDislike(input)
        } catch (error) {
            if(error instanceof BadRequestError){
                expect(error.message).toEqual("você não pode cutir seu proprio post.")
            }
        }
    })

})