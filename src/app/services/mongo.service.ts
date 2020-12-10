import {User} from "../models/user";
import {formatUser, formatUsers} from "./user.utils";
import {appInstance} from "../app";
import {Db, MongoClient} from "mongodb";
import {Request, Response} from "express";

const mongoUrl: string = 'mongodb+srv://izhaq:11072017@realmcluster.b9wxi.mongodb.net/Users?retryWrites=true&w=majority';
const dbName = 'Users';

export class MongoService {

    async callDb(cb: Function, ...params){
        const dbClient = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let connect;
        try {
            connect = await dbClient.connect();
            const usersConnection = await connect.db(dbName);
            return await cb(usersConnection, ...params);
        } catch (e) {
            console.error(e);
        }finally {
            connect.close();
        }
    }
}

export const login = async (connect: Db, { email, password }) => {
    const [ user ] = await connect.collection('UserProfile').find({ email, password }).toArray();
    return user ? formatUser(user): undefined;
}

export const getUserProfile = async (connect: Db, email: string) => {
    const [ user ] = await connect.collection('UserProfile').find({ email }).toArray();
    return formatUser(user);
}

export const getUsers = async (connect: Db) => {
    const data = await connect.collection('UserProfile').find().toArray();
    return formatUsers(data);
}

export const signup = async (connect: Db, user: Partial<User>) => {
    const { insertedId } = await connect.collection('UserProfile').insertOne(user);
    return insertedId;
}
