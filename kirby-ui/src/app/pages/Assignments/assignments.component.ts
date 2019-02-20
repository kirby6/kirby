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

    private createTreeChildren(modules: any[], tree: any[], processed_modules: number) {
        if (processed_modules == modules.length) return;
        for (let module of modules) {
            if (!module.parent) continue;
            let parent = tree.find((m) => m.id == module.parent.$oid);
            if (parent && !parent.children.find((m) => m.id == module._id.$oid)) {
                parent.children.push({
                    id: module._id.$oid,
                    name: module.name,
                    isActive: module._id.$oid === this.assignmentId,
                    parent: parent.id,
                    children: []
                });
                processed_modules++;
                this.createTreeChildren(modules, parent.children, processed_modules);
            }
        }
    }

    private createTree(modules: Module[]): any[] {
        let tree = [];
        for (let module of modules) {
            if (!module.parent && !tree.find((m) => m.id == module._id.$oid)) {
                tree.push({
                    id: module._id.$oid,
                    name: module.name,
                    isActive: module._id.$oid === this.assignmentId,
                    children: []
                });
            }
        }
        this.createTreeChildren(modules, tree, tree.length);
        return tree;
    }

    private getOpenedAssignments(): Observable<any[]> {
        return this.assignmentsService
            .get(this.auth.currentUserValue.id)
            .pipe(
                map((assignments: Assignment[]) => {
                    let allModules = assignments.map((assignment) => assignment.modules);
                    let flatAllModules = _.flatten(allModules);
                    return this.createTree(flatAllModules);
                })
            );
    }
} 
