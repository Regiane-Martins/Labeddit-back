"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentGetAllSchema = void 0;
const zod_1 = require("zod");
exports.commentGetAllSchema = zod_1.z.object({
    token: zod_1.z.string()
}).transform(data => data);
//# sourceMappingURL=commentsGet.dto.js.map