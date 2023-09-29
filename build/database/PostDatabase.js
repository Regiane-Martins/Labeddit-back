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
exports.PostDatabase = void 0;
const Basedatabase_1 = require("./Basedatabase");
class PostDatabase extends Basedatabase_1.BaseDatabase {
    findPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield Basedatabase_1.BaseDatabase.connection(PostDatabase.TABLE_POST).where({ id });
            if (!result) {
                return undefined;
            }
            const post = {
                id: result.id,
                creator_id: result.creator_id,
                content: result.content,
                likes: result.likes,
                dislikes: result.dislikes,
                created_at: result.created_at,
                updated_at: result.updated_at
            };
            return post;
        });
    }
    createPost(newPostDB) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Basedatabase_1.BaseDatabase.connection(PostDatabase.TABLE_POST).insert(newPostDB);
            return result;
        });
    }
    findPost() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Basedatabase_1.BaseDatabase.connection(PostDatabase.TABLE_POST)
                .select("post.id", "post.creator_id", "post.content", "post.likes", "post.dislikes", "post.created_at", "post.updated_at", "users.id as userId", "users.name as userName").from("post").innerJoin("users", "post.creator_id", "users.id");
            return result;
        });
    }
    updatePost(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Basedatabase_1.BaseDatabase.connection(PostDatabase.TABLE_POST).update({ content }).where({ id });
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Basedatabase_1.BaseDatabase.connection(PostDatabase.TABLE_POST).del().where({ id });
        });
    }
    findLikeDislike(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield Basedatabase_1.BaseDatabase.connection("likes_dislikes")
                .where({ post_id: postId })
                .andWhere({ user_id: userId });
            return result;
        });
    }
    createLikeDislike(likeDislikeDB) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Basedatabase_1.BaseDatabase.connection("likes_dislikes")
                .insert(likeDislikeDB).onConflict(['user_id', 'post_id'])
                .merge();
        });
    }
    deleteLikeDislike(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Basedatabase_1.BaseDatabase.connection("likes_dislikes").del()
                .where({ post_id: postId })
                .andWhere({ user_id: userId });
        });
    }
    incrementLike(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Basedatabase_1.BaseDatabase.connection(PostDatabase.TABLE_POST)
                .where({ id: postId })
                .increment('likes');
        });
    }
    decrementLike(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Basedatabase_1.BaseDatabase.connection(PostDatabase.TABLE_POST)
                .where({ id: postId })
                .decrement('likes');
        });
    }
    incrementDislike(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Basedatabase_1.BaseDatabase.connection(PostDatabase.TABLE_POST)
                .where({ id: postId })
                .increment('dislikes');
        });
    }
    decrementDislike(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Basedatabase_1.BaseDatabase.connection(PostDatabase.TABLE_POST)
                .where({ id: postId })
                .decrement('dislikes');
        });
    }
    revertLikeToDislike(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Basedatabase_1.BaseDatabase.connection(PostDatabase.TABLE_POST)
                .where({ id: postId })
                .increment('dislikes')
                .decrement('likes');
        });
    }
    revertDislikeToLike(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Basedatabase_1.BaseDatabase.connection(PostDatabase.TABLE_POST)
                .where({ id: postId })
                .increment('likes')
                .decrement('dislikes');
        });
    }
}
exports.PostDatabase = PostDatabase;
PostDatabase.TABLE_POST = "post";
//# sourceMappingURL=PostDatabase.js.map