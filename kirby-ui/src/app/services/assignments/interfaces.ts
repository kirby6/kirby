export interface Assignment {
    id?: string;
    user_id: string;
    excercise_id: string;
    status: AssignmentStatuses
}

export enum AssignmentStatuses {
    Opened='opened',
    Submitted='submitted',
    Redo='redo',
    Done='done'
}