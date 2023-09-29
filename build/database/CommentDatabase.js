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
exports.CommentDatabase = void 0;
const Basedatabase_1 = require("./Basedatabase");
class CommentDatabase extends Basedatabase_1.BaseDatabase {
    createComment(newComment) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Basedatabase_1.BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).insert(newComment);
            return result;
        });
    }
    findComment() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Basedatabase_1.BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).select("comments.id", "comments.creator_id", "comments.content", "comments.like", "comments.dislike", "comments.created_at", "comments.updated_at", "users.id as userId", "users.name as userName", "post_id as postId").from("comments").innerJoin("users", "comments.creator_id", "users.id").innerJoin("post", "comments.post_id", "post.id");
            return result;
        });
    }
    findCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield Basedatabase_1.BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).where({ id });
            if (!result) {
                return undefined;
            }
            const comment = {
                id: result.id,
                post_id: result.post_id,
                creator_id: result.creator_id,
                content: result.comment,
                like: result.like,
                dislike: result.dislike,
                created_at: result.created_at,
                updated_at: result.updated_at
            };
            return comment;
        });
    }
    updateComment(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Basedatabase_1.BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).update({ content }).where({ id });
        });
    }
    deleteComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Basedatabase_1.BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).del().where({ id });
        });
    }
    findLikeDislike(commentId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield Basedatabase_1.BaseDatabase.connection("likedislike_comments")
                .where({ comment_id: commentId })
                .andWhere({ user_id: userId });
            return result;
        });
    }
    createLikeDislike(LikeDislikeCommentDB) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Basedatabase_1.BaseDatabase.connection("likedislike_comments")
                .insert(LikeDislikeCommentDB).onConflict(['user_id', 'comment_id'])
                .merge();
        });
    }
    deleteLikeDislike(commentId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Basedatabase_1.BaseDatabase.connection("likedislike_comments").del()
                .where({ comment_id: commentId })
                .andWhere({ user_id: userId });
        });
    }
    incrementLike(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Basedatabase_1.BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
                .where({ id: commentId })
                .increment('like');
        });
    }
    decrementLike(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Basedatabase_1.BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
                .where({ id: commentId })
                .decrement('like');
        });
    }
    incrementDislike(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Basedatabase_1.BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
                .where({ id: commentId })
                .increment('dislike');
        });
    }
    decrementDislike(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Basedatabase_1.BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
                .where({ id: commentId })
                .decrement('dislike');
        });
    }
    revertLikeToDislike(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Basedatabase_1.BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
                .where({ id: commentId })
                .increment('dislike')
                .decrement('like');
        });
    }
    revertDislikeToLike(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Basedatabase_1.BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
                .where({ id: commentId })
                .increment('like')
                .decrement('dislike');
        });
    }
}
exports.CommentDatabase = CommentDatabase;
CommentDatabase.TABLE_COMMENTS = "comments";
//# sourceMappingURL=CommentDatabase.js.map