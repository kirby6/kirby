import { Module } from '../modules/interfaces';
import { Activity } from '../activities/interfaces';
export interface Assignment {
    _id?: {
        $oid: string;
    };
    user_id: string;
    activity_id: string;
    status: AssignmentStatuses;
    activity: Activity;
    modules: Module[];
}

export enum AssignmentStatuses {
    Opened='opened',
    Submitted='submitted',
    Redo='redo',
    Done='done'
}