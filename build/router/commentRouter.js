"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = __importDefault(require("express"));
const CommentController_1 = require("../controller/CommentController");
const CommentBusiness_1 = require("../business/CommentBusiness");
const CommentDatabase_1 = require("../database/CommentDatabase");
const IdGenerator_1 = require("../services/IdGenerator");
const TokenManager_1 = require("../services/TokenManager");
const PostDatabase_1 = require("../database/PostDatabase");
exports.commentRouter = express_1.default.Router();
const commentController = new CommentController_1.CommentController(new CommentBusiness_1.CommentBusiness(new CommentDatabase_1.CommentDatabase(), new PostDatabase_1.PostDatabase(), new IdGenerator_1.IdGenerator(), new TokenManager_1.TokenManager()));
exports.commentRouter.post('/:id', commentController.create);
exports.commentRouter.get('/', commentController.getAll);
exports.commentRouter.put('/:id', commentController.update);
exports.commentRouter.delete('/:id', commentController.delete);
exports.commentRouter.put('/:id/like', commentController.likeDislike);
//# sourceMappingURL=commentRouter.js.map