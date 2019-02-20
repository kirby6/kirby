import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { NavigationItem } from './interfaces';
import { MatTreeNestedDataSource } from '@angular/material';
import { NestedTreeControl } from '@angular/cdk/tree';

@Component({
    selector: 'navigation-list',
    templateUrl: './navigation-list.component.html',
    styleUrls: ['./navigation-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class NavigationListComponent {

    @Input() public links: NavigationItem[];

    getClass(navigationItem: NavigationItem) {
        return {
            'active': !!navigationItem.isActive
        };
    }

    treeControl = new NestedTreeControl<NavigationItem>(node => node.children);
    dataSource = new MatTreeNestedDataSource<NavigationItem>();
  
    ngOnInit() {
      this.dataSource.data = this.links;
    }
  
    hasChild = (_: number, node: NavigationItem) => !!node.children && node.children.length > 0;



}
