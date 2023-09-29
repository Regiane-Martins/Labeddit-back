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
exports.PostBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const User_1 = require("../models/User");
class PostBusiness {
    constructor(postDatabase, idGenerator, tokenManager) {
        this.postDatabase = postDatabase;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.create = (input) => __awaiter(this, void 0, void 0, function* () {
            const id = this.idGenerator.generate();
            const { content, token } = input;
            const result = this.tokenManager.getPayload(token);
            if (!result) {
                throw new BadRequestError_1.BadRequestError("token invalido.");
            }
            const newPostDB = {
                id,
                content,
                creator_id: result.id,
                likes: 0,
                dislikes: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            yield this.postDatabase.createPost(newPostDB);
        });
        this.getAll = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            const isTokenValid = this.tokenManager.getPayload(token);
            if (!isTokenValid) {
                throw new BadRequestError_1.BadRequestError("token invalido.");
            }
            const result = yield this.postDatabase.findPost();
            const output = result.map((post) => ({
                id: post.id,
                content: post.content,
                likes: post.likes,
                dislikes: post.dislikes,
                created_at: post.created_at,
                updated_at: post.updated_at,
                creator: {
                    id: post.userId,
                    name: post.userName
                }
            }));
            return output;
        });
        this.update = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, content, token } = input;
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("token invalido.");
            }
            const result = yield this.postDatabase.findPostById(id);
            if (!id) {
                throw new BadRequestError_1.BadRequestError("'Id'não encontrado.");
            }
            if (payload.id !== (result === null || result === void 0 ? void 0 : result.creator_id)) {
                throw new BadRequestError_1.BadRequestError("'Id'inválido.");
            }
            yield this.postDatabase.updatePost(id, content);
        });
        this.delete = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, token } = input;
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("token inválido.");
            }
            const result = yield this.postDatabase.findPostById(id);
            if (payload.id === (result === null || result === void 0 ? void 0 : result.creator_id) || payload.role === User_1.USER_ROLES.ADMIN) {
                yield this.postDatabase.deletePost(id);
            }
            else {
                throw new BadRequestError_1.BadRequestError("acesso negado.");
            }
        });
        this.likeDislike = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id: postId, like, token } = input;
            const isLiked = Number(like);
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("token invalido.");
            }
            const userId = payload.id;
            const result = yield this.postDatabase.findPostById(postId);
            if (typeof result === 'undefined') {
                throw new BadRequestError_1.BadRequestError("Post não localizado.");
            }
            if (userId === (result === null || result === void 0 ? void 0 : result.creator_id)) {
                throw new BadRequestError_1.BadRequestError("você não pode cutir seu proprio post.");
            }
            const likeDislikeDB = {
                post_id: postId,
                user_id: userId,
                like: isLiked
            };
            const likeExist = yield this.postDatabase.findLikeDislike(postId, userId);
            if (!likeExist) {
                yield this.postDatabase.createLikeDislike(likeDislikeDB);
                if (isLiked === 1) {
                    yield this.postDatabase.incrementLike(postId);
                }
                else {
                    yield this.postDatabase.incrementDislike(postId);
                }
            }
            else {
                if (isLiked !== likeExist.like) {
                    yield this.postDatabase.createLikeDislike(likeDislikeDB);
                    if (isLiked === 1) {
                        yield this.postDatabase.revertDislikeToLike(postId);
                    }
                    else {
                        yield this.postDatabase.revertLikeToDislike(postId);
                    }
                }
                else {
                    yield this.postDatabase.deleteLikeDislike(postId, userId);
                    if (isLiked === 1) {
                        yield this.postDatabase.decrementLike(postId);
                    }
                    else {
                        yield this.postDatabase.decrementDislike(postId);
                    }
                }
            }
        });
    }
}
exports.PostBusiness = PostBusiness;
//# sourceMappingURL=PostBusiness.js.map