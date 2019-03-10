import { Assignment, AssignmentStatuses } from 'src/app/services/assignments/interfaces';
import { ModulesService } from './../../../services/modules/index';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AssignmentsService } from './../../../services/assignments/index';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Module } from 'src/app/services/modules/interfaces';
import { map, switchMap } from 'rxjs/operators';
import { Observable, zip } from 'rxjs';
import { Cell, HeaderCell } from './interfaces';
import { AssignmentCellRenderer } from './custom-cells/assignments-cell.component';
import { UserService } from 'src/app/services/users';
import { User } from 'src/app/services/users/interfaces';

@Component({
    selector: 'assignments-matrix',
    templateUrl: './assignments-matrix.component.html',
    styleUrls: ['./assignments-matrix.component.scss']
})
export class AssignmentsMatrixComponent implements OnInit {
    public title: string = 'מטריצה';
    public headers: any[] = [];
    public rows: Cell[][] = [];

    public activitiesCells: Cell[];

    public gridOptions = {
        columnDefs: this.headers,
        suppressCellSelection: true,
        frameworkComponents: {
            'AssignmentCellRenderer': AssignmentCellRenderer
        },
    };

    private basicColumn = {
        cellRenderer: 'AssignmentCellRenderer',
        valueGetter: (params) => {
            return params.data.find(d => d.activity &&
                d.activity.id === params.colDef.activity.id &&
                d.module.id === params.colDef.module.id)
        }
    };


    constructor(
        private assignmentsService: AssignmentsService,
        private modulesService: ModulesService,
        private userService: UserService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        zip(
            this.route.paramMap.pipe(
                map((params: ParamMap) => params.get('moduleId')),
                switchMap((moduleId: string) => this.getModules(moduleId)),
            ),
            this.userService.getAll(),
            this.assignmentsService.getAll()
        )
            .subscribe(([modules, users, assignments]: [Module[], User[], Assignment[]]) => {

                this.headers = [
                    ...this.usernameHeaderCells(),
                    ...this.getHeadersFromModules(modules)
                ];

                this.activitiesCells = this.getActivitiesCellsFromModules(modules);

                this.rows = users.map((user) => {
                    return this.activitiesCells.map((activityCell: Cell) => {
                        let currentAssignment: Assignment = assignments.find((assignment: Assignment) => {
                            return assignment.user_id === user.id &&
                                assignment.activity_id === activityCell.activity.id;
                        });

                        if (currentAssignment) {
                            return {
                                ...activityCell,
                                user,
                                status: currentAssignment.status,
                                redoCount: currentAssignment.redo_count,
                            } as Cell
                        }
                        return { ...activityCell, user };
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

    private getActivitiesCellsFromModules(modules: Module[]): Cell[] {
        return modules.reduce((allActivities: Cell[], currModule: Module) => {
            allActivities.push(...currModule.activities
                .map(activity => {
                    return {
                        redoCount: 0,
                        status: AssignmentStatuses.NotOpened,
                        user: null,
                        activity,
                        module: currModule
                    } as Cell;
                }));
            return allActivities;
        }, []);
    }

    public onGridReady(params) {
        params.api.sizeColumnsToFit();
    }

    private getHeadersFromModules(modules: Module[]): HeaderCell[] {
        return modules.map(module => ({
            headerName: module.name,
            module,
            children: module.activities.map(activity => ({
                headerName: activity.name,
                activity,
                module,
                ...this.basicColumn
            }))
        }));
    }

    private usernameHeaderCells(): HeaderCell[] {
        return [
            {
                headerName: 'משתמש',
                valueGetter: (params) => `${params.data[0].user.username}`,
                pinned: 'right',
                width: 150
            },
            {
                headerName: 'שם',
                valueGetter: (params) => `${params.data[0].user.firstname || ""} ${params.data[0].user.lastname || ""}`,
                pinned: 'right',
                width: 150
            }
        ];
    }
}


