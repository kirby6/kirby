import { Component, OnInit, Input } from '@angular/core';
import { EventNotification } from './interfaces';


@Component({
    selector: 'event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss']
})

export class EventListComponent implements OnInit {

    @Input() public title: string;

    @Input() public events: EventNotification[] = [
        {
            id: '0',
            name: 'C# overview II',
            description: 'תרגול בC#',
        },
        {
            id: '1',
            name: 'C# overview II',
            description: 'תרגול בC#',
        },
        {
            id: '2',
            name: 'C# overview II',
            description: 'תרגול בC#',
        },
        {
            id: '3',
            name: 'C# overview II',
            description: 'תרגול בC#',
        },
        {
            id: '4',
            name: 'C# overview II',
            description: 'תרגול בC#',
        },

    ];

    public get unreadCount(): number {
        return this.events && this.events.length || 0;
    }

    constructor() {
    }

    ngOnInit() {
    }

    getClass(EventNotification: EventNotification) {
        return { read: !!EventNotification.isRead, unread: !EventNotification.isRead };
    }

    onEventSelected(event: EventNotification): void {
        if (event.id) {
            window.location.href = `/EventNotifications/${event.id}`;
        }
    }
}
