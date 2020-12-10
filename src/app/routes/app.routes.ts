import {Request, Response, NextFunction} from "express";
import {UsersController} from "../controllers/users.controller";

export class AppRoutes {

    public userController: UsersController = new UsersController()

    public routes(app): void {

        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(500).send({
                    message: 'Server is up !'
                })
            })

        app.route('/api/getUserProfile/:userId')
            .get((req: Request, res: Response) => this.userController.getUserProfile(req, res));

        app.route('/api/users')
            .get((req: Request, res: Response) => this.userController.getUsers(req, res));

        app.route('/api/login')
            .post((req: Request, res: Response) => this.userController.login(req, res));

        app.route('/api/signup')
            .post((req: Request, res: Response) => this.userController.signup(req, res));

    }
}
