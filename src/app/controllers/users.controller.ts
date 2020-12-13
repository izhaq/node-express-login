import { Request, Response } from 'express';
import {User, Users} from "../models/user";
import {getUserProfile, login, getUsers, signup, MongoService} from "../services/mongo.service";

export class UsersController {

    private driver: MongoService = new MongoService();

    constructor() {}

    public login (req: Request, res: Response) {
        this.driver.callDb(login, req.body)
            .then(( user ) => user ? res.json(user): res.status(401).send('wrong user/password'));
    }

    public signup (req: Request, res: Response) {
        this.driver.callDb(signup, req.body).then(( data ) => data ? res.json({ data }):
            res.status(206).send('wrong !'));
    }

    public getUserProfile (req: Request, res: Response) {
        const { params: { userId: email }  } = req;
        this.driver.callDb(getUserProfile, email).then(( user: Partial<User>) => res.json(user));
    }

    public getUsers (req: Request, res: Response) {
        this.driver.callDb(getUsers).then(( users: Users) => res.json(users));
    }
}
