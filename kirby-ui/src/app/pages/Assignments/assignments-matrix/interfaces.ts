import { AssignmentStatuses } from 'src/app/services/assignments/interfaces';
import { Activity } from 'src/app/services/activities/interfaces';
import { Module } from 'src/app/services/modules/interfaces';

export interface Cell {
    redoCount: number;
    status: AssignmentStatuses;
    user: string;
    activity: Activity;
}

export interface HeaderCell extends Module {
    colspan: number;
}