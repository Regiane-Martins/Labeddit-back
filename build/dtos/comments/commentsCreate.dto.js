"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentCreateSchema = void 0;
const zod_1 = require("zod");
exports.commentCreateSchema = zod_1.z.object({
    post_id: zod_1.z.string().min(2),
    content: zod_1.z.string(),
    token: zod_1.z.string()
}).transform(data => data);
//# sourceMappingURL=commentsCreate.dto.js.map