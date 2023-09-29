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
exports.CommentBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const NotFoundError_1 = require("../errors/NotFoundError");
const User_1 = require("../models/User");
class CommentBusiness {
    constructor(commentDatabase, postDatabase, idGenerator, tokenManager) {
        this.commentDatabase = commentDatabase;
        this.postDatabase = postDatabase;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.create = (input) => __awaiter(this, void 0, void 0, function* () {
            const id = this.idGenerator.generate();
            const { post_id, content, token } = input;
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("token invalido");
            }
            const result = yield this.postDatabase.findPostById(post_id);
            if (!result) {
                throw new BadRequestError_1.BadRequestError("Post não encontrado.");
            }
            const newComment = {
                id,
                post_id,
                creator_id: payload.id,
                content,
                like: 0,
                dislike: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            yield this.commentDatabase.createComment(newComment);
        });
        this.get = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("token invalido.");
            }
            const result = yield this.commentDatabase.findComment();
            const output = result.map((comment) => ({
                id: comment.id,
                content: comment.content,
                likes: comment.like,
                dislikes: comment.dislike,
                created_at: comment.created_at,
                updated_at: comment.updated_at,
                creator: {
                    id: comment.userId,
                    post_id: comment.postId,
                    name: comment.userName
                }
            }));
            return output;
        });
        this.update = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, content, token } = input;
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("token inválido.");
            }
            const result = yield this.commentDatabase.findCommentById(id);
            if (!result) {
                throw new NotFoundError_1.NotFoundError("'Id'não localizado.");
            }
            if (payload.id !== result.creator_id) {
                throw new BadRequestError_1.BadRequestError("'Id'inválido");
            }
            yield this.commentDatabase.updateComment(id, content);
        });
        this.delete = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, token } = input;
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("token inválido.");
            }
            const result = yield this.commentDatabase.findCommentById(id);
            if (!result) {
                throw new NotFoundError_1.NotFoundError("'Id'não localizado.");
            }
            if (payload.id === result.creator_id || payload.role === User_1.USER_ROLES.ADMIN) {
                yield this.commentDatabase.deleteComment(id);
            }
            else {
                throw new BadRequestError_1.BadRequestError("acesso negado.");
            }
        });
        this.likeDislike = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id: commentId, like, token } = input;
            const isLiked = Number(like);
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("token invalido.");
            }
            const userId = payload.id;
            const result = yield this.commentDatabase.findCommentById(commentId);
            if (typeof result === 'undefined') {
                throw new BadRequestError_1.BadRequestError("Comentário não localizado.");
            }
            const likeDislikeDB = {
                comment_id: commentId,
                user_id: userId,
                like: isLiked
            };
            const likeExist = yield this.commentDatabase.findLikeDislike(commentId, userId);
            if (!likeExist) {
                yield this.commentDatabase.createLikeDislike(likeDislikeDB);
                if (isLiked === 1) {
                    yield this.commentDatabase.incrementLike(commentId);
                }
                else {
                    yield this.commentDatabase.incrementDislike(commentId);
                }
            }
            else {
                if (isLiked !== likeExist.like) {
                    yield this.commentDatabase.createLikeDislike(likeDislikeDB);
                    if (isLiked === 1) {
                        yield this.commentDatabase.revertDislikeToLike(commentId);
                    }
                    else {
                        yield this.commentDatabase.revertLikeToDislike(commentId);
                    }
                }
                else {
                    yield this.commentDatabase.deleteLikeDislike(commentId, userId);
                    if (isLiked === 1) {
                        yield this.commentDatabase.decrementLike(commentId);
                    }
                    else {
                        yield this.commentDatabase.decrementDislike(commentId);
                    }
                }
            }
        });
    }
}
exports.CommentBusiness = CommentBusiness;
//# sourceMappingURL=CommentBusiness.js.map