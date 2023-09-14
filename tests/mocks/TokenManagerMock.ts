import { USER_ROLES } from '../../src/models/User'
import { TokenPayload } from '../../src/services/TokenManager'

export class TokenManagerMock {
  public createToken = (payload: TokenPayload): string => {
    if (payload.id === "id-mock") {
      // signup de nova conta
      return "token-mock"

    } else if (payload.id === "id-mock-fulano") {
      // login de fulano (conta normal)
      return "token-mock-fulano"

    } else {
      // login de ciclano (conta admin)
      return "token-mock-ciclano"
    }
  }

  public getPayload = (token: string): TokenPayload | null => {
    if (token === "token-mock-fulano") {
      return {
        id: "id-mock-fulano",
        name: "Fulano",
        role: USER_ROLES.NORMAL
      }

    } else if (token === "token-mock-ciclano") {
      return {
        id: "id-mock-ciclano",
        name: "Ciclano",
        role: USER_ROLES.ADMIN
      }

    } else {
      return null
    }
  }
}