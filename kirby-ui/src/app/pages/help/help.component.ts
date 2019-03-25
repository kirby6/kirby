import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EventNotification } from 'src/app/components/event-list/interfaces';
import { NotificationsService } from 'src/app/services/notifications';
import { HelpsService } from 'src/app/services/helps';
import { Observable } from 'rxjs';
import { Help } from 'src/app/services/helps/interfaces';

@Component({
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.scss']
})
export class HelpPageComponent implements OnInit {
    private helpId: string;
    public help: Help;

    constructor(
        private route: ActivatedRoute,
        private notificationsService: NotificationsService,
        private helpsService: HelpsService,
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.helpId = params.get('helpId');
            this.updateHelp();
            this.notificationsService.listen()
                .subscribe((notification) => {
                    if (notification.context.msg === 'help state changed' &&
                        notification.context.id === this.helpId) {
                        this.updateHelp();
                    }
                });
        });
    }

    private updateHelp() {
        this.getHelp()
            .subscribe((help: Help) => {
                this.help = help;
            });
    }

    private getHelp(): Observable<Help> {
        return this.helpsService.get(this.helpId);
    }

    public getCommentContext() {
        return { id: this.help.id, type: 'help' };
    }

    public getCommentReceivingUserIds() {
        return [this.help.sender_id];
    }

    public resolveHelp() {
        this.helpsService.changeState(this.helpId, { is_closed: true }).subscribe();
    }

    public reopenHelp() {
        this.helpsService.changeState(this.helpId, { is_closed: false }).subscribe();
    }
} 
