export interface NavigationItem {
    id: string;
    name: string;
    description?: string;
    children?: NavigationItem[];
}

export interface NavigationTree {
    [parent: string]: NavigationItem[]
}

export interface NewNavigationItem {
    name: string;
    parent?: string;
}
