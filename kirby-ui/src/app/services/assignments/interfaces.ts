import { Module } from '../modules/interfaces';
import { Activity } from '../activities/interfaces';
import { User } from '../users/interfaces';
export interface Assignment {
    id?: string;
    user_id: string;
    user: User,
    activity_id: string;
    status: AssignmentStatuses;
    activity: Activity;
    modules: Module[];
    redo_count: number;
    submission: object;
}

export enum AssignmentStatuses {
    Opened = 'opened',
    Submitted = 'submitted',
    Redo = 'redo',
    Done = 'done',
    NotOpened = 'not-opened',
}
