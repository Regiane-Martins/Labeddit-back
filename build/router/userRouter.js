"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const UserBusiness_1 = require("../business/UserBusiness");
const UserDatabase_1 = require("../database/UserDatabase");
const TokenManager_1 = require("../services/TokenManager");
const IdGenerator_1 = require("../services/IdGenerator");
const HashManager_1 = require("../services/HashManager");
exports.userRouter = express_1.default.Router();
exports.userController = new UserController_1.UserController(new UserBusiness_1.UserBusiness(new UserDatabase_1.UserDatabase(), new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager(), new TokenManager_1.TokenManager()));
exports.userRouter.post('/signup', exports.userController.create);
exports.userRouter.get('/', exports.userController.getUser);
exports.userRouter.post('/login', exports.userController.login);
//# sourceMappingURL=userRouter.js.map