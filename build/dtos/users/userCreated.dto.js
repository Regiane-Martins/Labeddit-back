"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCreatedSchema = void 0;
const zod_1 = require("zod");
exports.userCreatedSchema = zod_1.z.object({
    name: zod_1.z.string({
        invalid_type_error: "'name' deve ser do tipo string"
    }).min(2),
    email: zod_1.z.string({
        invalid_type_error: "'email' deve ser do tipo string"
    }).email("'email' invalido"),
    password: zod_1.z.string({
        invalid_type_error: "'password' deve ser do tipo string"
    }).min(5),
}).transform(data => data);
//# sourceMappingURL=userCreated.dto.js.map