import { Component, Input } from '@angular/core';
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

    getClass(navigationItem: NavigationItem) {
        return {
            active: !!navigationItem.isActive || (this.selectedAssignmentId === navigationItem.id)
        };
    }

    treeControl = new NestedTreeControl<NavigationItem>(node => node.children);
    dataSource = new MatTreeNestedDataSource<NavigationItem>();
    private selectedAssignmentId: string = null;

    hasChild = (_: number, node: NavigationItem) => !!node.children && node.children.length > 0;

    selectAssignment(asssignmentId: string): void {
        this.selectedAssignmentId = asssignmentId || null;
    }
}