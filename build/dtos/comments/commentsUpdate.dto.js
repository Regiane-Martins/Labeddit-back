"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentUpdateSchema = void 0;
const zod_1 = require("zod");
exports.commentUpdateSchema = zod_1.z.object({
    id: zod_1.z.string({
        required_error: "'id' é obrigatória",
        invalid_type_error: "'id' deve ser do tipo string"
    }),
    content: zod_1.z.string({
        invalid_type_error: "'content' deve ser do tipo string"
    }),
    token: zod_1.z.string().min(2)
}).transform(data => data);
//# sourceMappingURL=commentsUpdate.dto.js.map