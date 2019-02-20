
export interface NavigationItem {
    id: string;
    name: string;
    description?: string;
    isActive: boolean;
    children?: NavigationItem[];
}

export interface NavigationTree {
    [parent: string]: NavigationItem[]
}
