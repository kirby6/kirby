export interface Activity {
    id?: string;
    name: string;
    module: any;
    files?: File[];
}

export interface File {
    id?: string;
    filename: string;
}
