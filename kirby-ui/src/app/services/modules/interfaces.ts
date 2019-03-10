import { Activity } from '../activities/interfaces';

export interface Module {
    id: string;
    name: string;
    activities: Activity[];
    parent?: string;
}