import { Role } from '../authentication/interfaces';
import { ObjectId } from 'src/app/utils/interfaces';

export interface User {
    _id?: ObjectId;
    firstname: string;
    lastname: FunctionStringCallback;
    username: string;
    password: string;
    roles?: Role[];
    token?: string;
    groups?: ObjectId[];
}
