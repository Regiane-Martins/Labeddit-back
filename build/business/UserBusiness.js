"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
const User_1 = require("../models/User");
const BadRequestError_1 = require("../errors/BadRequestError");
class UserBusiness {
    constructor(userDatabase, idGenerator, hashManager, tokenManager) {
        this.userDatabase = userDatabase;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.tokenManager = tokenManager;
        this.insertUser = (input) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = input;
            const id = this.idGenerator.generate();
            const hashedPassword = yield this.hashManager.hash(password);
            const emailExist = yield this.userDatabase.findUserByEmail(email);
            if (emailExist) {
                throw new BadRequestError_1.BadRequestError("'e-mail'já cadastrado");
            }
            const newUser = new User_1.User(id, name, email, hashedPassword, User_1.USER_ROLES.NORMAL, new Date().toISOString());
            const newUserDB = {
                id: newUser.getId(),
                name: newUser.getName(),
                email: newUser.getEmail(),
                password: newUser.getPassword(),
                role: User_1.USER_ROLES.NORMAL,
                created_at: newUser.getCreatedAt()
            };
            yield this.userDatabase.createUser(newUserDB);
            const tokenPayload = {
                id: newUser.getId(),
                name: newUser.getName(),
                role: newUser.getRole()
            };
            const token = this.tokenManager.createToken(tokenPayload);
            const output = {
                message: "Usuário cadastrado com sucesso.",
                token: token
            };
            return output;
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userDatabase.findUser();
            const output = result.map((user) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.created_at
            }));
            return output;
        });
        this.login = (input) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            const user = yield this.userDatabase.findUserByEmail(email);
            if (!user) {
                throw new BadRequestError_1.BadRequestError("e-mail não localizado.");
            }
            const isValidPassword = yield this.hashManager.compare(password, user.password);
            if (!isValidPassword) {
                throw new BadRequestError_1.BadRequestError("senha inválida");
            }
            const tokenPayload = {
                id: user.id,
                name: user.name,
                role: user.role
            };
            const token = this.tokenManager.createToken(tokenPayload);
            const output = {
                token: token
            };
            return output;
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map