import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { NavigationItem } from './interfaces';

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
}
