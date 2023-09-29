"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
class Post {
    constructor(id, creatorId, content, likes, dislikes, createdAt, updatedAt) {
        this.id = id;
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
    setCreatorId(newCreatorId) {
        this.creatorId = newCreatorId;
    }
    setContent(newContent) {
        this.content = newContent;
    }
}
exports.Post = Post;
//# sourceMappingURL=Post.js.map