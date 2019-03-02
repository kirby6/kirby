import { Module } from './../modules/interfaces';
import { ObjectId } from './../../utils/interfaces';
export interface Activity {
    _id?: ObjectId;
    name: string;
}

export interface File {
    _id?: ObjectId;
    filename: string;
}
