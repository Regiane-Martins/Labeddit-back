"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const PostController_1 = require("../controller/PostController");
const PostBusiness_1 = require("../business/PostBusiness");
const PostDatabase_1 = require("../database/PostDatabase");
const IdGenerator_1 = require("../services/IdGenerator");
const TokenManager_1 = require("../services/TokenManager");
exports.postRouter = express_1.default.Router();
const postController = new PostController_1.PostController(new PostBusiness_1.PostBusiness(new PostDatabase_1.PostDatabase(), new IdGenerator_1.IdGenerator(), new TokenManager_1.TokenManager()));
exports.postRouter.post('/', postController.insert);
exports.postRouter.get('/', postController.getAll);
exports.postRouter.put('/:id', postController.update);
exports.postRouter.delete('/:id', postController.delete);
exports.postRouter.put('/:id/like', postController.likeDislike);
//# sourceMappingURL=postRouter.js.map