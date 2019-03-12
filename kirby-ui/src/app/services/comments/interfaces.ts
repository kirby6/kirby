import { User } from '../users/interfaces';
import { ISODate } from 'src/app/utils/interfaces';

export interface Comment {
    id?: string,
    context: object,
    message: string,
    author_id: string,
    author?: User,
    post_date?: ISODate,
}
