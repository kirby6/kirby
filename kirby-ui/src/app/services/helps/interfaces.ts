import { User } from '../users/interfaces';
import { Group } from '../groups/interfaces';

export interface Help {
    id?: string;
    message: string;
    sender_id: string;
    receiving_group_id: string;
    sender?: User,
    receiving_group?: Group,
    is_closed?: boolean;
    is_read?: boolean;
    creation_time?: string;
    context?: object;
}
