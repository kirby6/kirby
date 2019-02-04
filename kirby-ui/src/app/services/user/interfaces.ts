import { Role } from '../authentication/interfaces';

export interface User {
    id?:string;
    firstname: string;
    lastname: FunctionStringCallback;
    username: string;
    password: string;
    roles?: Role[];
    token?: string;
}
