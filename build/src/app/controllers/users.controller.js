"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const mongo_service_1 = require("../services/mongo.service");
class UsersController {
    constructor() {
        this.driver = new mongo_service_1.MongoService();
    }
    login(req, res) {
        this.driver.callDb(mongo_service_1.login, req.body)
            .then((user) => user ? res.json(user) : res.status(401).send('wrong user/password'));
    }
    signup(req, res) {
        this.driver.callDb(mongo_service_1.signup, req.body).then((id) => id ? res.json({ id }) :
            res.status(206).send('wrong !'));
    }
    getUserProfile(req, res) {
        const { params: { userId: email } } = req;
        this.driver.callDb(mongo_service_1.getUserProfile, email).then((user) => res.json(user));
    }
    getUsers(req, res) {
        this.driver.callDb(mongo_service_1.getUsers).then((users) => res.json(users));
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map