import { Module } from '../modules/interfaces';

export interface Activity {
    id?: string;
    name: string;
    modules?: Module[];
    type: string;
    submissions?: object;
    files?: File[];
}

export interface File {
    id?: string;
    filename: string;
}
