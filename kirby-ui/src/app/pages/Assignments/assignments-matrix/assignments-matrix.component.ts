import { Assignment, AssignmentStatuses } from 'src/app/services/assignments/interfaces';
import { ModulesService } from './../../../services/modules/index';
import { ActivatedRoute } from '@angular/router';
import { AssignmentsService } from './../../../services/assignments/index';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication';
import * as _ from 'lodash';
import { Module } from 'src/app/services/modules/interfaces';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/services/activities/interfaces';
import { Row, HeaderCell } from './interfaces';

@Component({
    selector: 'assignments-matrix',
    templateUrl: './assignments-matrix.component.html',
    styleUrls: ['./assignments-matrix.component.scss']
})
export class AssignmentsMatrixComponent implements OnInit {
    public title: string = 'מטריצה';
    public modules: Module[] = [];
    public activities: Activity[];
    public rows: Row[][] = [];

    public get columns(): string[] {
        return this.activities.map((a: any) => a.name);
    }

    constructor(
        private assignmentsService: AssignmentsService,
        private modulesService: ModulesService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            let moduleId: string = params.get('moduleId');
            this.getModules(moduleId).pipe(map((modules) => modules.map(this.moduleToHeaderCell)))
                .subscribe((headers: HeaderCell[]) => {
                    this.modules = headers;
                    this.activities = this.getActivities(headers);

                    this.assignmentsService.getAll()
                        .subscribe((assignments: Assignment[]) => {
                            let assignmentsByUsers = _.chain(assignments).map(this.assignmentToRow).groupBy('user').value();
                            this.rows = Object.keys(assignmentsByUsers).map((userId: string) => assignmentsByUsers[userId]);
                        });

                });
        });
    }


    private getModules(moduleId?: string): Observable<Module[]> {
        if (moduleId) {
            return this.modulesService.getById(moduleId).pipe(map(m => [m]));
        } else {
            return this.modulesService.getAll();
        }
    }

    private getActivities(modules: Module[]): Activity[] {
        return modules.reduce((allActivities: Activity[], currModule: Module) => {
            allActivities.push(...currModule.activities);
            return allActivities;
        }, []);
    }

    getModulesNames(modules: Module[]): string[] {
        return modules.map(m => m.name);
    }

    private getCellClass(cell) {
        return {
            'status-submitted': cell.status == AssignmentStatuses.Submitted,
            'status-opened': cell.status == AssignmentStatuses.Opened,
            'status-redo': cell.status == AssignmentStatuses.Redo,
            'status-done': cell.status == AssignmentStatuses.Done
        };
    }

    private assignmentToRow(assignment: Assignment): Row {
        return {
            redoCount: assignment.redo_count,
            status: assignment.status,
            user: assignment.user._id.$oid,
            activity: assignment.activity
        } as Row
    }

    private moduleToHeaderCell(module: Module): HeaderCell {
        return { ...module, colspan: module.activities.length };
    }

} 