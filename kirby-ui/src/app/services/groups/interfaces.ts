import { User } from '../users/interfaces';

export interface Group {
    id?: string;
    name: string;
    parent?: string;
    members: User[];
}
