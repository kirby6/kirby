import { ActivitiesService } from './../../../services/activities/index';
import { Assignment, AssignmentStatuses } from 'src/app/services/assignments/interfaces';
import { ModulesService } from './../../../services/modules/index';
import { ActivatedRoute } from '@angular/router';
import { AssignmentsService } from './../../../services/assignments/index';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Module } from 'src/app/services/modules/interfaces';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/services/activities/interfaces';
import { Cell, HeaderCell } from './interfaces';

@Component({
    selector: 'assignments-matrix',
    templateUrl: './assignments-matrix.component.html',
    styleUrls: ['./assignments-matrix.component.scss']
})
export class AssignmentsMatrixComponent implements OnInit {
    public title: string = 'מטריצה';
    public headers: HeaderCell[] = [];
    public rows: Cell[][] = [];

    //TODO: fill the empty cells with the activities..
    public activitiesCells: Cell[];

    public get columns(): string[] {

        let x = ['username', ...this.activitiesCells.map((ac: Cell) => ac.activity.name)];
        console.log({ columns: x })
        return x;
    }

    constructor(
        private assignmentsService: AssignmentsService,
        private modulesService: ModulesService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            let moduleId: string = params.get('moduleId');

            this.getModules(moduleId)
                .pipe(map((modules) => modules.map(this.moduleToHeaderCell)))
                .subscribe((headersRow: HeaderCell[]) => {
                    this.headers = headersRow;
                    this.activitiesCells = this.getCellsFromActivities(headersRow);

                    this.assignmentsService.getAll()
                        .subscribe((assignments: Assignment[]) => {
                            let assignmentsByUsers = _.chain(assignments).map(this.assignmentToCell).groupBy('user').value();

                            this.rows = Object.keys(assignmentsByUsers).map((userId: string) => {
                                return [
                                    {
                                        user: userId,
                                        activity: null,
                                        redoCount: 0,
                                        status: null
                                    },
                                    ...(_.unionWith(assignmentsByUsers[userId], this.activitiesCells, (a, b) => a.activity._id.$oid === b.activity._id.$oid))
                                ]
                            });
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

    private getCellsFromActivities(headerRows: HeaderCell[]): Cell[] {
        return headerRows.reduce((allActivities: Cell[], currCell: HeaderCell) => {
            allActivities.push(...currCell.activities
                .map(activity => {
                    return {
                        redoCount: 0,
                        status: AssignmentStatuses.NotOpened,
                        user: null,
                        activity,
                    } as Cell;
                }));
            return allActivities;
        }, []);
    }

    getModulesNames(modules: Module[]): string[] {
        return modules.map(m => m.name);
    }

    private getCellClass(cell: Cell, i): object {
        console.log({ cell, i })
        return {
            'status-submitted': cell.status == AssignmentStatuses.Submitted,
            'status-opened': cell.status == AssignmentStatuses.Opened,
            'status-redo': cell.status == AssignmentStatuses.Redo,
            'status-done': cell.status == AssignmentStatuses.Done
        };
    }

    private assignmentToCell(assignment: Assignment): Cell {
        return {
            redoCount: assignment.redo_count,
            status: assignment.status,
            user: assignment.user._id.$oid,
            activity: assignment.activity
        } as Cell
    }

    private moduleToHeaderCell(module: Module): HeaderCell {
        return { ...module, colspan: module.activities.length };
    }

} 