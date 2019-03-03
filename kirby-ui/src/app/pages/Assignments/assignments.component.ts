import { Module } from './../../services/modules/interfaces';
import { Assignment } from './../../services/assignments/interfaces';
import { AuthenticationService } from './../../services/authentication/index';
import { AssignmentsService } from './../../services/assignments/index';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { NavigationTree } from './navigation-list/interfaces';

@Component({
    templateUrl: './assignments.component.html',
    styleUrls: ['./assignments.component.scss']
})
export class AssignmentsPageComponent {
    private moduleId: string;
    public openedAssignments: NavigationTree;

    constructor(private route: ActivatedRoute,
        private assignmentsService: AssignmentsService,
        private auth: AuthenticationService
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.moduleId = params.get('moduleId');
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
            let parent = tree.find((m) => m.id == module.parent);
            if (parent && !parent.children.find((m) => m.id == module.id)) {
                parent.children.push({
                    id: module.id,
                    name: module.name,
                    isActive: module.id === this.moduleId,
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
            if (!module.parent && !tree.find((m) => m.id == module.id)) {
                tree.push({
                    id: module.id,
                    name: module.name,
                    isActive: module.id === this.moduleId,
                    children: []
                });
            }
        }
        this.createTreeChildren(modules, tree, tree.length);
        return tree;
    }

    private getOpenedAssignments(): Observable<any[]> {
        return this.assignmentsService
            .getByUserId(this.auth.currentUserValue.id)
            .pipe(
                map((assignments: Assignment[]) => {
                    let allModules = assignments.map((assignment) => assignment.modules);
                    let flatAllModules = _.flatten(allModules);
                    return this.createTree(flatAllModules);
                })
            );
    }
} 
