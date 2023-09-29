"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentDeleteSchema = void 0;
const zod_1 = require("zod");
exports.commentDeleteSchema = zod_1.z.object({
    id: zod_1.z.string({ required_error: "'id' é obrigatória" }),
    token: zod_1.z.string().min(2)
}).transform(data => data);
//# sourceMappingURL=commentsDelete.dto.js.map