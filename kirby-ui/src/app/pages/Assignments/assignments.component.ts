import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './assignments.component.html',
    styleUrls: ['./assignments.component.scss']
})
export class AssignmentsPageComponent {
    private assignmentId: string;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {


        this.route.paramMap.subscribe(params => {
            console.log(params.get('assignmentId'));
            this.assignmentId = params.get('assignmentId');
        });
    }

}