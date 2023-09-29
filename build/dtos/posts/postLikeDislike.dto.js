"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeDislikeSchema = void 0;
const zod_1 = require("zod");
exports.likeDislikeSchema = zod_1.z.object({
    id: zod_1.z.string().min(2),
    like: zod_1.z.boolean(),
    token: zod_1.z.string().min(2)
}).transform(data => data);
//# sourceMappingURL=postLikeDislike.dto.js.map