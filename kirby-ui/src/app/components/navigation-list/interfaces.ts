
export interface NavigationItem {
    id: string;
    name: string;
    description?: string;
    isActive: boolean;
    parent?: string;
}

export interface NavigationTree {
    [parent: string]: NavigationItem[]
}
