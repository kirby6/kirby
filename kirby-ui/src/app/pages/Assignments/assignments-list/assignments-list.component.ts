import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from './../../../services/assignments/index';
import { Component, OnInit } from '@angular/core';
import { EventNotification } from 'src/app/components/event-list/interfaces';
import { AuthenticationService } from 'src/app/services/authentication';
import { Assignment, AssignmentStatuses } from 'src/app/services/assignments/interfaces';
import { map } from 'rxjs/operators';

@Component({
    selector: 'assignments-list',
    template: `
        <event-list title='מטלות' [events]="assignments" (clicked)="onAssgignmentSelected($event)"></event-list>
    `,
})
export class AssignmentsListComponent implements OnInit {
    public assignments: EventNotification[] = [];

    constructor(
        private assignmentsService: AssignmentsService,
        private auth: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            let moduleId: string = params.get('moduleId');

            this.assignmentsService.getByUserId(this.auth.currentUserValue.id)
                .pipe(
                    map((assignments: Assignment[]) => assignments
                        .filter(a => a.modules.findIndex(module => module.id == moduleId))),
                    map((assignments: Assignment[]) => assignments.map(this.assignmentToEventNotification)),
                )
                .subscribe((openedAssignments: EventNotification[]) => {
                    this.assignments = openedAssignments;
                });
        });
    }

    private assignmentToEventNotification(assignment: Assignment): EventNotification {
        return ({
            id: assignment.id,
            name: assignment.activity.name,
            description: AssignmentStatuses[assignment.status]
        }) as EventNotification
    }

    private onAssgignmentSelected(assignment: EventNotification): void {
        this.router.navigate(['assignment', assignment.id]);
    }
} 
[]