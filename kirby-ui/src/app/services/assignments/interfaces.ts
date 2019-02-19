import { Excercise } from './../excersices/interfaces';
import { Module } from '../modules/interfaces';
export interface Assignment {
    id?: string;
    user_id: string;
    exercise_id: string;
    status: AssignmentStatuses;
    exercise: Excercise;
    modules: Module[];
}

export enum AssignmentStatuses {
    Opened='opened',
    Submitted='submitted',
    Redo='redo',
    Done='done'
}