import { Module } from '../modules/interfaces';

export interface Activity {
    id?: string;
    name: string;
    modules?: Module[];
    submissions?: object;
    files?: File[];
}

export interface Submission {
    name: string;
    data?: object;
}

export interface NewActivity {
    name: string;
    files?: FileList;
    submissions?: Submission[];
}

export interface File {
    id?: string;
    filename: string;
}
