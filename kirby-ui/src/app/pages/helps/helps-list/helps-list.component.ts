import { ActivatedRoute } from '@angular/router';
import { AssignmentsService } from './../../../services/assignments/index';
import { Component } from '@angular/core';
import { EventNotification } from 'src/app/components/event-list/interfaces';
import { AuthenticationService } from 'src/app/services/authentication';

@Component({
    selector: 'helps-list',
    template: `
        <event-list title='בקשות לעזרה' [events]="helps"></event-list>
    `,
})
export class HelpsListComponent {
    public helps: EventNotification[] = [];

    constructor(
        private assignmentsService: AssignmentsService,
        private auth: AuthenticationService,
        private route: ActivatedRoute) { }
} 
