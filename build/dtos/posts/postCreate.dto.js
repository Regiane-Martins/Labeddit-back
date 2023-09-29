"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCreateSchema = void 0;
const zod_1 = require("zod");
exports.postCreateSchema = zod_1.z.object({
    content: zod_1.z.string(),
    token: zod_1.z.string()
}).transform(data => data);
//# sourceMappingURL=postCreate.dto.js.map