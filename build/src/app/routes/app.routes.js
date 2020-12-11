"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const users_controller_1 = require("../controllers/users.controller");
class AppRoutes {
    constructor() {
        this.userController = new users_controller_1.UsersController();
    }
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(500).send({
                message: 'Server is up !'
            });
        });
        app.route('/api/getUserProfile/:userId')
            .get((req, res) => this.userController.getUserProfile(req, res));
        app.route('/api/users')
            .get((req, res) => this.userController.getUsers(req, res));
        app.route('/api/login')
            .post((req, res) => this.userController.login(req, res));
        app.route('/api/signup')
            .post((req, res) => this.userController.signup(req, res));
    }
}
exports.AppRoutes = AppRoutes;
//# sourceMappingURL=app.routes.js.map