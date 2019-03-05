import { ActivatedRoute } from '@angular/router';
import { AssignmentsService } from './../../../services/assignments/index';
import { Component, OnInit } from '@angular/core';
import { EventNotification } from 'src/app/components/event-list/interfaces';
import { AuthenticationService } from 'src/app/services/authentication';
import { NotificationsService } from 'src/app/services/notifications';

@Component({
    selector: 'helps-list',
    template: `
        <event-list title='בקשות לעזרה' [events]="helps"></event-list>
    `,
})
export class HelpsListComponent implements OnInit {
    public helps: EventNotification[] = [];

    constructor(
        private assignmentsService: AssignmentsService,
        private auth: AuthenticationService,
        private route: ActivatedRoute,
        private notificationsService: NotificationsService,
    ) { }

    ngOnInit() {
        this.notificationsService.getMessage<any>()
            .subscribe((notification: any) => {
                console.log(notification);
            });
    }
} 
