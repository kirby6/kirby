import { User } from '../users/interfaces';

export interface Comment {
    id?: string,
    context: object,
    message: string,
    author_id: string,
    author?: User,
    is_read: boolean,
    post_date?: string
}
