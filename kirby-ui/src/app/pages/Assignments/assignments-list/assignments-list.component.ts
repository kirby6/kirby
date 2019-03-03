import { ActivatedRoute } from '@angular/router';
import { AssignmentsService } from './../../../services/assignments/index';
import { Component, OnInit } from '@angular/core';
import { EventNotification } from 'src/app/components/event-list/interfaces';
import { AuthenticationService } from 'src/app/services/authentication';
import { Assignment } from 'src/app/services/assignments/interfaces';
import { map } from 'rxjs/operators';

@Component({
    selector: 'assignments-list',
    template: `
        <event-list title='מטלות' [events]="assignments"></event-list>
    `,
})
export class AssignmentsListComponent implements OnInit {
    public assignments: EventNotification[] = [];

    constructor(
        private assignmentsService: AssignmentsService,
        private auth: AuthenticationService,
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
            description: assignment.activity.module
        }) as EventNotification
    }
} 
