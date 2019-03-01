import { Activity } from './../activities/interfaces';
import { ObjectId } from 'src/app/utils/interfaces';

export interface Module {
    _id: ObjectId;
    name: string;
    parent: ObjectId;
    activities: Activity[];
}