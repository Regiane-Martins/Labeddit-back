"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.USER_ROLES = void 0;
var USER_ROLES;
(function (USER_ROLES) {
    USER_ROLES["NORMAL"] = "NORMAL";
    USER_ROLES["ADMIN"] = "ADMIN";
})(USER_ROLES || (exports.USER_ROLES = USER_ROLES = {}));
class User {
    constructor(id, name, email, password, role, createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdAt = createdAt;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    getRole() {
        return this.role;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setName(newName) {
        this.name = newName;
    }
    setEmail(newEmail) {
        this.email = newEmail;
    }
    setPassword(newPassword) {
        this.password = newPassword;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map