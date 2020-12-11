"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUsers = exports.formatUser = void 0;
exports.formatUser = (user) => {
    const { _id: id, password } = user, rest = __rest(user, ["_id", "password"]);
    return Object.assign({ id }, rest);
};
exports.formatUsers = (users) => {
    return users.map((user) => exports.formatUser(user));
};
//# sourceMappingURL=user.utils.js.map