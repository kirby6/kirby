import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../services/authentication/index';
import { Assignment } from './../../services/assignments/interfaces';
import { Observable } from 'rxjs';
import { AssignmentsService } from './../../services/assignments/index';

@Component({
    templateUrl: './assignment.component.html',
    styleUrls: ['./assignment.component.scss']
})
export class AssignmentPageComponent {
    private assignmentId: string;
    public assignment: Assignment;

    constructor(private route: ActivatedRoute,
        private assignmentsService: AssignmentsService,
        private auth: AuthenticationService
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.assignmentId = params.get('assignmentId');
            this.getAssignment()
                .subscribe((assignment: any) => {
                    this.assignment = assignment;
                    debugger;
                });
        });
    }

    private getAssignment(): Observable<any[]> {
        return this.assignmentsService.get(this.assignmentId);
    }
}
