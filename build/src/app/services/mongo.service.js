"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.getUsers = exports.getUserProfile = exports.login = exports.MongoService = void 0;
const user_utils_1 = require("./user.utils");
const mongodb_1 = require("mongodb");
const mongoUrl = 'mongodb+srv://izhaq:11072017@realmcluster.b9wxi.mongodb.net/Users?retryWrites=true&w=majority';
const dbName = 'Users';
class MongoService {
    callDb(cb, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbClient = new mongodb_1.MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
            let connect;
            try {
                connect = yield dbClient.connect();
                const usersConnection = yield connect.db(dbName);
                return yield cb(usersConnection, ...params);
            }
            catch (e) {
                console.error(e);
            }
            finally {
                connect.close();
            }
        });
    }
}
exports.MongoService = MongoService;
exports.login = (connect, { email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const [user] = yield connect.collection('UserProfile').find({ email, password }).toArray();
    return user ? user_utils_1.formatUser(user) : undefined;
});
exports.getUserProfile = (connect, email) => __awaiter(void 0, void 0, void 0, function* () {
    const [user] = yield connect.collection('UserProfile').find({ email }).toArray();
    return user_utils_1.formatUser(user);
});
exports.getUsers = (connect) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield connect.collection('UserProfile').find().toArray();
    return user_utils_1.formatUsers(data);
});
exports.signup = (connect, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { insertedId } = yield connect.collection('UserProfile').insertOne(user);
    return insertedId;
});
//# sourceMappingURL=mongo.service.js.map