import { FormComponent } from './submissions/forms/interfaces';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assignment } from './../../services/assignments/interfaces';
import { Observable } from 'rxjs';
import { AssignmentsService } from './../../services/assignments/index';
import { ActivityFileComponent } from './activity-file/activity-file.component';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';

@Component({
    templateUrl: './assignment.component.html',
    styleUrls: ['./assignment.component.scss']
})
export class AssignmentPageComponent {
    private assignmentId: string;
    public assignment: Assignment;

    constructor(private route: ActivatedRoute,
        private assignmentsService: AssignmentsService,
        private bottomSheet: MatBottomSheet,
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.assignmentId = params.get('assignmentId');
            this.getAssignment()
                .subscribe((assignment: any) => {
                    this.assignment = assignment;
                });
        });
    }

    private getAssignment(): Observable<any[]> {
        return this.assignmentsService.get(this.assignmentId);
    }

    openFilesMenu() {
        this.bottomSheet.open(ActivityFileComponent, {
            data: {
                files: this.assignment.activity.files,
                activity: this.assignment.activity
            }
        });
    }

    public getSubmissions() {
        return Object.keys(this.assignment.activity.submissions || {});
    }

    public getCommentContext() {
        return { id: this.assignment.id, type: 'assignment' };
    }

    public getHelpContext() {
        return { id: this.assignment.id, type: 'assignment' };
    }
}
