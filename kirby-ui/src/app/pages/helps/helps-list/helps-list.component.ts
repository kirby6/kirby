import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from './../../../services/assignments/index';
import { Component } from '@angular/core';
import { EventNotification } from 'src/app/components/event-list/interfaces';
import { AuthenticationService } from 'src/app/services/authentication';

@Component({
    selector: 'helps-list',
    template: `
        <event-list title='בקשות לעזרה' [events]="helps" (clicked)="onHelpSelected($event)"></event-list>
    `,
})
export class HelpsListComponent {
    public helps: EventNotification[] = [];

    constructor(
        private assignmentsService: AssignmentsService,
        private auth: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute) { }

        
    private onHelpSelected(help: EventNotification): void {
        this.router.navigate(['help', help.id]);
    }
} 
