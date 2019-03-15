import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventNotification } from './interfaces';


@Component({
    selector: 'event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss']
})

export class EventListComponent {

    @Input() public title: string;

    @Input() public events: EventNotification[];
    @Output() public clicked: EventEmitter<EventNotification> = new EventEmitter();

    public get unreadCount(): number {
        return this.events && this.events.filter(event => !event.isRead).length || 0;
    }
    getClass(EventNotification: EventNotification) {
        return { read: !!EventNotification.isRead, unread: !EventNotification.isRead };
    }

    onEventSelected(event: EventNotification): void {
        if (event) {
            this.clicked.emit(event);
        }
    }
}
