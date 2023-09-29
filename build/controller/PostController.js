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
exports.PostController = void 0;
const zod_1 = require("zod");
const postCreate_dto_1 = require("../dtos/posts/postCreate.dto");
const BaseError_1 = require("../errors/BaseError");
const postGet_dto_1 = require("../dtos/posts/postGet.dto");
const postUpdate_tdo_1 = require("../dtos/posts/postUpdate.tdo");
const postDelete_dto_1 = require("../dtos/posts/postDelete.dto");
const postLikeDislike_dto_1 = require("../dtos/posts/postLikeDislike.dto");
class PostController {
    constructor(postBusines) {
        this.postBusines = postBusines;
        this.insert = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = postCreate_dto_1.postCreateSchema.parse({
                    content: req.body.content,
                    token: req.headers.authorization
                });
                yield this.postBusines.create(input);
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
                const input = postGet_dto_1.postGetAllSchema.parse({
                    token: req.headers.authorization
                });
                const result = yield this.postBusines.getAll(input);
                res.status(200).send(result);
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
                const input = postUpdate_tdo_1.postUpdateSchema.parse({
                    id: req.params.id,
                    content: req.body.content,
                    token: req.headers.authorization
                });
                yield this.postBusines.update(input);
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
                const input = postDelete_dto_1.postDeleteSchema.parse({
                    id: req.params.id,
                    token: req.headers.authorization
                });
                yield this.postBusines.delete(input);
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
                const input = postLikeDislike_dto_1.likeDislikeSchema.parse({
                    id: req.params.id,
                    like: req.body.like,
                    token: req.headers.authorization
                });
                yield this.postBusines.likeDislike(input);
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
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map