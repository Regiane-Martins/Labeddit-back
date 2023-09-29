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
exports.CommentController = void 0;
const zod_1 = require("zod");
const BaseError_1 = require("../errors/BaseError");
const commentsCreate_dto_1 = require("../dtos/comments/commentsCreate.dto");
const commentsGet_dto_1 = require("../dtos/comments/commentsGet.dto");
const commentsUpdate_dto_1 = require("../dtos/comments/commentsUpdate.dto");
const commentsDelete_dto_1 = require("../dtos/comments/commentsDelete.dto");
const commentsLikeDislike_dto_1 = require("../dtos/comments/commentsLikeDislike.dto");
class CommentController {
    constructor(commentBusiness) {
        this.commentBusiness = commentBusiness;
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = commentsCreate_dto_1.commentCreateSchema.parse({
                    post_id: req.params.id,
                    content: req.body.content,
                    token: req.headers.authorization
                });
                yield this.commentBusiness.create(input);
                res.sendStatus(201);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    res.status(400).send(error.issues);
                }
                else if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = commentsGet_dto_1.commentGetAllSchema.parse({
                    token: req.headers.authorization
                });
                const output = yield this.commentBusiness.get(input);
                res.status(200).send(output);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    res.status(400).send(error.issues);
                }
                else if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = commentsUpdate_dto_1.commentUpdateSchema.parse({
                    id: req.params.id,
                    content: req.body.content,
                    token: req.headers.authorization
                });
                yield this.commentBusiness.update(input);
                res.status(200).send({ message: "Updated" });
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    res.status(400).send(error.issues);
                }
                else if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = commentsDelete_dto_1.commentDeleteSchema.parse({
                    id: req.params.id,
                    token: req.headers.authorization
                });
                yield this.commentBusiness.delete(input);
                res.status(200).send({ message: "Post deletado." });
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    res.status(400).send(error.issues);
                }
                else if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.likeDislike = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = commentsLikeDislike_dto_1.commentLikeDislikeSchema.parse({
                    id: req.params.id,
                    like: req.body.like,
                    token: req.headers.authorization
                });
                yield this.commentBusiness.likeDislike(input);
                res.sendStatus(200);
            }
            catch (error) {
                console.log(error);
                if (error instanceof zod_1.ZodError) {
                    res.status(400).send(error.issues);
                }
                else if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
    }
}
exports.CommentController = CommentController;
//# sourceMappingURL=CommentController.js.map