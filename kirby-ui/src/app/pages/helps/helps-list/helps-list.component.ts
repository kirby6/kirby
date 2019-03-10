import { ActivatedRoute } from '@angular/router';
import { AssignmentsService } from './../../../services/assignments/index';
import { Component, OnInit } from '@angular/core';
import { EventNotification } from 'src/app/components/event-list/interfaces';
import { AuthenticationService } from 'src/app/services/authentication';
import { NotificationsService } from 'src/app/services/notifications';
import { HelpsService } from 'src/app/services/helps';
import { Help } from 'src/app/services/helps/interfaces';

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
        private helpsService: HelpsService,
    ) { }

    ngOnInit() {
        this.updateHelps();
        this.notificationsService.getMessage<any>('help')
            .subscribe((notification) => {
                if (notification.msg === 'help created') {
                    this.updateHelps();
                }
            });
    }

    private updateHelps() {
        this.helpsService.getAll().subscribe((helps) => {
            this.helps = helps.map(this.helpToEventNotification);
        });
    }

    private helpToEventNotification(help: Help): EventNotification {
        return {
            id: help.id,
            name: `from ${help.sender.username} to ${help.receiving_group.name}`,
            description: help.message,
            isRead: help.is_read,
        }
    }
} 
