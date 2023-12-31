import { UserBusiness } from "../../../src/business/UserBusiness"
import { userLoginSchema } from "../../../src/dtos/users/userLogin.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

describe("Testando metodo de login", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new TokenManagerMock()
    )

    test("Deve gerar um token ao logar", async () => {
        const input = userLoginSchema.parse({
            email: "fulano@email.com",
            password: "fulano123"
        })
        const output = await userBusiness.login(input)

        expect(output).toEqual({
            token: "token-mock-fulano"
        })
    })

    test("Deve retornar erro caso o email do usuário não seja encontrado", async () => {
        const input = userLoginSchema.parse({
            email: "gogo@email.com",
            password: "fulano123"
        })

        await expect(userBusiness.login(input)).rejects.toThrow()
    })

    test("Deve retornar erro caso password esteja incorreto ao logar", async() => {
        
            expect.assertions(1)
            try {
                const input = {
                    email: "fulano@email.com",
                    password: "123"
                }
                const output = await userBusiness.login(input)

            } catch (error) {
                if (error instanceof BadRequestError) {
                    expect(error.message).toEqual("senha inválida")     
                }  
        }
    })
})