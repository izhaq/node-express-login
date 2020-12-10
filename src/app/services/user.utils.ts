import {User, Users} from "../models/user";

export const formatUser = (user: User & { _id: string }): Partial<User> => {
    const { _id: id, password, ...rest } = user;
    return {
        id,
        ...rest
    }
}

export const formatUsers = (users: Array<User & { _id: string }>): Users => {
    return users.map( (user) => formatUser(user) );
}
