import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EventNotification } from 'src/app/components/event-list/interfaces';
import { NotificationsService } from 'src/app/services/notifications';
import { HelpsService } from 'src/app/services/helps';
import { Help } from 'src/app/services/helps/interfaces';

@Component({
    selector: 'helps-list',
    template: `
        <event-list title='בקשות לעזרה' [events]="helps" (clicked)="onHelpSelected($event)"></event-list>
    `,
})
export class HelpsListComponent implements OnInit {
    public helps: EventNotification[] = [];

    constructor(
        private notificationsService: NotificationsService,
        private helpsService: HelpsService,
        private router: Router,
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
            name: `מ${help.sender.firstname} ${help.sender.lastname} ל${help.receiving_group.name}`,
            description: help.message,
            isRead: help.is_read,
        }
    }

    private onHelpSelected(help: EventNotification): void {
        this.router.navigate(['help', help.id]);
    }
} 
