import { Component } from '@angular/core';
import { EventNotification } from 'src/app/components/event-list/interfaces';

@Component({
    selector: 'comment-list',
    template: `
        <event-list title='תגובות' [events]="comments"></event-list>
    `,
})
export class CommentListComponent {
    public comments: EventNotification[] = [];
} 
