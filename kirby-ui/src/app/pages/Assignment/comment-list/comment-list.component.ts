import { ActivatedRoute } from '@angular/router';
import { AssignmentsService } from './../../../services/assignments/index';
import { Component } from '@angular/core';
import { EventNotification } from 'src/app/components/event-list/interfaces';
import { AuthenticationService } from 'src/app/services/authentication';

@Component({
    selector: 'comment-list',
    template: `
        <event-list title='תגובות' [events]="comments"></event-list>
    `,
})
export class CommentListComponent {
    public comments: EventNotification[] = [];

    constructor(
        private assignmentsService: AssignmentsService,
        private auth: AuthenticationService,
        private route: ActivatedRoute) { }
} 
