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
import { ColumnHoverService } from 'ag-grid-community/dist/lib/rendering/columnHoverService';
import { AssignmentCellRenderer } from './costum-cells/assignments-cell.component';

@Component({
    selector: 'assignments-matrix',
    templateUrl: './assignments-matrix.component.html',
    styleUrls: ['./assignments-matrix.component.scss']
})
export class AssignmentsMatrixComponent implements OnInit {
    public title: string = 'מטריצה';
    public headers: any[] = [];
    public rows: Cell[][] = [];
    public columns = [];

    public activitiesCells: Cell[];

    public gridOptions = {
        columnDefs: this.headers,

        frameworkComponents: {
            'AssignmentCellRenderer': AssignmentCellRenderer
        },
    };

    private basicColumn = {
        cellRenderer: 'AssignmentCellRenderer',
        // valueGetter: (params) => params.data.find(d => d.activity && d.activity._id.$oid === params.colDef.activity._id.$oid)
    };


    constructor(
        private assignmentsService: AssignmentsService,
        private modulesService: ModulesService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            let moduleId: string = params.get('moduleId');

            this.getModules(moduleId)
                .pipe(
                    // map((modules: Module[]) => {
                    //     let allActiv: any[] = [{
                    //         headerName: 'username',
                    //         valueGetter: (params) => params.data[0].user
                    //     }];

                    //     modules.forEach((module: Module) => {
                    //         module.activities.forEach((ac: Activity) => {
                    //             allActiv.push({
                    //                 headerName: `${ac.name}-${module.name}`,
                    //                 field: 'val',
                    //                 module: module,
                    //                 activity: ac,
                    //                 ...this.basicColumn
                    //             });
                    //         });
                    //     });

                    //     this.columns = allActiv;
                    //     return modules;
                    // }),
                    map((modules) => modules.map(this.moduleToHeaderCell))
                )
                .subscribe((headersRow: HeaderCell[]) => {
                    this.headers = [
                        {
                            headerName: 'username',
                            valueGetter: (params) => params.data[0].user
                        }
                        , ...headersRow.map(h => ({
                            headerName: h.name,
                            children: h.activities.map(a => ({
                                headerName: a.name,
                                ...this.basicColumn
                            }))
                        }))];
                    console.log({ headers: this.headers })

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

                            console.log({ rows: this.rows })
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


    public getModuleColDef(header: HeaderCell): string {
        return `header-module-${header.name}`;
    }

    public getModulesColDef(headers: HeaderCell[]): string[] {
        return headers.map(this.getModuleColDef);
    }

    public onGridReady(params) {
        console.log({ params });
        params.api.sizeColumnsToFit();
    }

} 