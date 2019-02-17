import { Component, OnInit, Input } from '@angular/core';
import { EventNotification } from './interfaces';


@Component({
    selector: 'navigation-list',
    templateUrl: './navigation-list.component.html',
    styleUrls: ['./navigation-list.component.scss']
})

export class NavigationListComponent {
    
    @Input() public links: any[] = [
        {
            id: '0',
            name: 'C#',
            description: 'תרגול בC#',
        },
        {
            id: '1',
            name: 'Web',
            description: 'תרגול בWeb',
        },
        {
            id: '2',
            name: 'Linux',
            description: 'תרגול בLinux',
        },
        {
            id: '3',
            name: 'Python',
            description: 'תרגול בPython',
        },
        {
            id: '4',
            name: 'Git',
            description: 'תרגול בGit',
        },

    ];
}
