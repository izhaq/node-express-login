export interface User {
    firstName: string;
    lastName: string;
    email: string;
    age: string;
    password: string;
    id: string
}

export type Users = Array<Partial<User>>;
