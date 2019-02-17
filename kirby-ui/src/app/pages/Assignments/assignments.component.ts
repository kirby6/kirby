import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of as ObservableOf } from 'rxjs';
import { Observable } from 'rxjs';
import { NavigationItem } from 'src/app/components/navigation-list/interfaces';
import { map } from 'rxjs/operators';

@Component({
    templateUrl: './assignments.component.html',
    styleUrls: ['./assignments.component.scss']
})
export class AssignmentsPageComponent {
    private assignmentId: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            console.log(params.get('assignmentId'));
            this.assignmentId = params.get('assignmentId');
        });
    }

    private getAssignmentsByCategoryId(): Observable<NavigationItem[]> {
        return ObservableOf([
            {
                id: '0',
                name: 'C#',
                description: 'תרגול בC#',
            },
            {
                id: '1',
                name: 'Web',
                description: 'תרגול בWeb',
            },
            {
                id: '2',
                name: 'Linux',
                description: 'תרגול בLinux',
            },
            {
                id: '3',
                name: 'Python',
                description: 'תרגול בPython',
            },
            {
                id: '4',
                name: 'Git',
                description: 'תרגול בGit',
            },

        ])
            .pipe(
                map((assignments: NavigationItem[]) => {
                    assignments.forEach(a => a.isActive = (a.id === this.assignmentId));
                    return assignments;
                })
            );
    }

} 