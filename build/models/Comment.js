"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = void 0;
class Comments {
    constructor(id, postId, creatorId, content, likes, dislikes, createdAt, updatedAt) {
        this.id = id;
        this.postId = postId;
        this.creatorId = creatorId;
        this.content = content;
        this.likes = likes;
        this.dislikes = dislikes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    getId() {
        return this.id;
    }
    getPostId() {
        return this.postId;
    }
    getCreatorId() {
        return this.creatorId;
    }
    getContent() {
        return this.content;
    }
    getLikes() {
        return this.likes;
    }
    getDislikes() {
        return this.dislikes;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    setPostId(newPostId) {
        this.postId = newPostId;
    }
    setCreatorId(newCreatorId) {
        this.creatorId = newCreatorId;
    }
    setContent(newContent) {
        this.content = newContent;
    }
}
exports.Comments = Comments;
//# sourceMappingURL=Comment.js.map