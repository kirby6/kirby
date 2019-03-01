export interface Activity {
    _id?: {
        $oid: string;
    };
    name: string;
    module: any;
}

export interface File {
    _id?: {
        $oid: string;
    };
    filename: string;
}
