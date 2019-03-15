export interface Activity {
    id?: string;
    name: string;
    module: any;
    type: string;
    submissions?: object;
    files?: File[];
}

export interface File {
    id?: string;
    filename: string;
}
