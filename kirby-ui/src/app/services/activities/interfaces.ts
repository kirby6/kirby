export interface Activity {
    id?: string;
    name: string;
    module: any;
    type: string;
    files?: File[];
}

export interface File {
    id?: string;
    filename: string;
}
