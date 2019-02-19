import { Excercise } from './../../services/excersices/interfaces';
import { Module } from './../../services/modules/interfaces';
import { Assignment } from './../../services/assignments/interfaces';
import { AuthenticationService } from './../../services/authentication/index';
import { AssignmentsService } from './../../services/assignments/index';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of as ObservableOf } from 'rxjs';
import { Observable } from 'rxjs';
import { NavigationItem, NavigationTree } from 'src/app/components/navigation-list/interfaces';
import { map } from 'rxjs/operators';
import { EventNotification } from 'src/app/components/event-list/interfaces';
import * as _ from 'lodash';

@Component({
    templateUrl: './assignments.component.html',
    styleUrls: ['./assignments.component.scss']
})
export class AssignmentsPageComponent {
    private assignmentId: string;
    public openedAssignments: NavigationTree;

    constructor(private route: ActivatedRoute,
        private assignmentsService: AssignmentsService,
        private auth: AuthenticationService
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.assignmentId = params.get('assignmentId');

            this.getOpenedAssignments()
                .subscribe((openedAssignments: any) => {
                    this.openedAssignments = openedAssignments;
                });
        });
    }

    private createTreeAcc(modules: Module[], tree: any[]): any[] {
        if (modules.length == 0) {
            return [];
        }
        let len = modules.length;
        for (let i = 0; i < len; ++i) {
            for (let t of tree) {
                let m = modules[i];
                if (m.parent && m.parent.$oid === t._id.$oid) {
                    t.children = _.uniqBy([...(t.children || []), m], (module) => module._id.$oid);
                    modules.splice(modules.indexOf(m), 1);
                    i++;
                    this.createTreeAcc(modules, t.children);
                }
            }
        }
        this.createTreeAcc(modules, tree)
    }

    private createTree(modules: Module[]): any[] {
        let tree = _.uniqBy(modules.filter(t => !t.parent), (module) => module._id.$oid);
        return this.createTreeAcc(modules, tree);
    }

    private getOpenedAssignments(): Observable<any[]> {

        return this.assignmentsService
            .get(this.auth.currentUserValue.id)
            .pipe(
                map((assignments: Assignment[]) => {
                    let allModules = assignments.map((assignment) => assignment.modules);
                    let flatAllModules = _.flatten(allModules);
                    console.log({flatAllModules});
                    let x = this.createTree(flatAllModules);
                    console.log({ list_to_tree: x });
                    return x;
                }),
                // map((assignments: Assignment[]) => {

                //    assignments.forEach((assignment: any) => {
                //        assignment.children = assignment.children.map(child => {
                //         return {
                //             id: child.id,
                //             name: child.name,
                //             parent: child.module,
                //             isActive: child.id == this.assignmentId,
                //         } as NavigationItem   
                //        });
                //    });


                //     let x = assignments.map((assignment: any) => {
                //         return {
                //             id: assignment.id,
                //             name: assignment.name,
                //             parent: assignment.parent,
                //             isActive: assignment.id == this.assignmentId,
                //             children: assignment.children
                //         } as NavigationItem
                //     });

                //     console.log(x);
                //     return x;

                // }),

            );
    }

    private getEventsForSelectedAssignment(): Observable<EventNotification[]> {
        return ObservableOf([]);
    }

} 