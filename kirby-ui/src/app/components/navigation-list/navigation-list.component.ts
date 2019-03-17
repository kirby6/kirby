import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavigationItem, NewNavigationItem } from './interfaces';
import { MatTreeNestedDataSource } from '@angular/material';
import { NestedTreeControl } from '@angular/cdk/tree';

@Component({
    selector: 'navigation-list',
    templateUrl: './navigation-list.component.html',
    styleUrls: ['./navigation-list.component.scss'],
})

export class NavigationListComponent {
    @Input() public set items(items: NavigationItem[]) {
        this.dataSource.data = items;
    }
    @Input() public routeNames: string[];

    @Input() public isEditable: boolean;
    @Input() public addNavigationItemLabel: string;

    @Output() public onCreateNode: EventEmitter<NewNavigationItem> = new EventEmitter();

    @Output() public onNavigate: EventEmitter<NavigationItem> = new EventEmitter<NavigationItem>();

    treeControl = new NestedTreeControl<NavigationItem>(node => node.children);
    dataSource = new MatTreeNestedDataSource<NavigationItem>();

    hasChild = (_: number, node: NavigationItem) => !!node.children && node.children.length > 0;

    public selectItem(navigationItem: NavigationItem): void {
        this.onNavigate.emit(navigationItem);
    }

    public getRouterLink(nodeId) {
        let outlets = this.routeNames.reduce((outlets, route) => {
            return { ...outlets, [route]: nodeId };
        }, {});
        return { outlets };
    }

    public createNode(name: string, parent?: string) {
        if (this.isEditable) {
            this.onCreateNode.emit({
                name: name,
                parent: parent,
            } as NewNavigationItem);
        }
    }
}
