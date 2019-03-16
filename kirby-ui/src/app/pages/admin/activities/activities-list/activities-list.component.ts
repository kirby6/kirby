import { ActivatedRoute, Router } from '@angular/router';
import { ActivitiesService } from 'src/app/services/activities';
import { ModulesService } from 'src/app/services/modules';
import { Component, OnInit } from '@angular/core';
import { EventNotification } from 'src/app/components/event-list/interfaces';
import { Activity } from 'src/app/services/activities/interfaces';
import { map } from 'rxjs/operators';

@Component({
    selector: 'activities-list',
    template: `
        <event-list title='תרגילים' [events]="activities" (clicked)="onActivitySelected($event)"></event-list>
    `,
})
export class ActivitiesListComponent implements OnInit {
    public activities: EventNotification[] = [];

    constructor(
        private activitiesService: ActivitiesService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            let moduleId: string = params.get('moduleId');

            this.activitiesService.getAll()
                .pipe(
                    map((activities: Activity[]) => activities),
                    // .filter(a => a.modules.findIndex(module => module.id == moduleId))),
                    map((activities: Activity[]) => activities.map(this.activityToEventNotification)),
                )
                .subscribe((activities: EventNotification[]) => {
                    this.activities = activities;
                });
        });
    }

    private activityToEventNotification(activity: Activity): EventNotification {
        return ({
            id: activity.id,
            name: activity.name,
            description: "asdf"
        }) as EventNotification
    }

    private onActivitySelected(activity: EventNotification): void {
        this.router.navigate(['activity', activity.id]);
    }
}
