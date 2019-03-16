import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavigationItem } from './interfaces';
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

    @Output() public onNavigate: EventEmitter<NavigationItem> = new EventEmitter<NavigationItem>();

    treeControl = new NestedTreeControl<NavigationItem>(node => node.children);
    dataSource = new MatTreeNestedDataSource<NavigationItem>();

    hasChild = (_: number, node: NavigationItem) => !!node.children && node.children.length > 0;

    selectItem(navigationItem: NavigationItem): void {
        this.onNavigate.emit(navigationItem);
    }

    public getRouterLink(nodeId) {
        let outlets = this.routeNames.reduce((outlets, route) => {
            return { ...outlets, [route]: nodeId };
        }, {});
        return {
            outlets: outlets
        };
    }
}
