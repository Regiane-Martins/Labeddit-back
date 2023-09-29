"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = void 0;
const zod_1 = require("zod");
exports.userLoginSchema = zod_1.z.object({
    email: zod_1.z.string({
        invalid_type_error: "'email' deve ser do tipo string"
    }).email("'email' invalido"),
    password: zod_1.z.string({ invalid_type_error: "'password' deve ser do tipo string"
    }).min(5)
}).transform(data => data);
//# sourceMappingURL=userLogin.dto.js.map