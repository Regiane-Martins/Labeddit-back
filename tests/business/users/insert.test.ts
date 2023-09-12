import { UserBusiness } from "../../../src/business/UserBusiness"
import { IdGeneratorMock } from '../../mocks/IdGeneratorMock'
import { TokenManagerMock } from '../../mocks/TokenManagerMock'
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { userCreatedSchema } from "../../../src/dtos/users/userCreated.dto"

describe("Testando modulos de insertUser", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new TokenManagerMock()
    )
    test("Deve gerar um token ao cadastrar usuário", async () => {
        const input = userCreatedSchema.parse({
            name: "Graca",
            email: "graca@email.com",
            password: "graca65"
        })

        const output = await userBusiness.insertUser(input)

        expect(output).toEqual({
            message: "Usuário cadastrado com sucesso.",
            token: "token-mock"
        })
    })

    test("deve disparar erro se email já cadastrado", async () => {
        const input = userCreatedSchema.parse({
            name: "Meg",
            email: "fulano@email.com",
            password: "meguinha"
        })

       await expect(userBusiness.insertUser(input)).rejects.toThrow()
    })
})