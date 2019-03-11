import { AssignmentStatuses, Assignment } from 'src/app/services/assignments/interfaces';
import { Activity } from 'src/app/services/activities/interfaces';
import { Module } from 'src/app/services/modules/interfaces';
import { User } from 'src/app/services/users/interfaces';

export interface Cell {
    redoCount: number;
    status: AssignmentStatuses;
    user: User;
    activity: Activity;
    module: Module;
    assignment?: Assignment;
}

export interface HeaderCell {
    headerName: string;
    valueGetter?: (params) => any,
    pinned?: boolean | 'right' | 'left';
    children?: HeaderCell[];
    width?: number;
}