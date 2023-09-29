"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postGetAllSchema = void 0;
const zod_1 = require("zod");
exports.postGetAllSchema = zod_1.z.object({
    token: zod_1.z.string()
}).transform(data => data);
//# sourceMappingURL=postGet.dto.js.map