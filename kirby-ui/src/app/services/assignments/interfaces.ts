import { Module } from '../modules/interfaces';
import { Activity } from '../activities/interfaces';
import { ObjectId } from 'src/app/utils/interfaces';
import { User } from '../users/interfaces';
export interface Assignment {
    _id?: ObjectId;
    user_id: string;
    user: User,
    activity_id: string;
    status: AssignmentStatuses;
    activity: Activity;
    modules: Module[];
    redo_count: number;
}

export enum AssignmentStatuses {
    Opened='opened',
    Submitted='submitted',
    Redo='redo',
    Done='done',
    NotOpened='not-opened',
}