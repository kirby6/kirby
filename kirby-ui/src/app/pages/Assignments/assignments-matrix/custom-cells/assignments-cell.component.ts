import { Assignment } from 'src/app/services/assignments/interfaces';
import { AssignmentsService } from './../../../../services/assignments/index';
import { AssignmentStatuses } from './../../../../services/assignments/interfaces';
import { Component, OnDestroy, ViewChild } from "@angular/core";

import { ICellRendererAngularComp } from "ag-grid-angular";
import { MatMenuTrigger } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
    selector: 'assignment-cell',
    templateUrl: './assignments-cell.component.html',
    styleUrls: ['./assignments-cell.component.scss']
})
export class AssignmentCellRenderer implements ICellRendererAngularComp {
    public params: any;
    public value;
    public assignmentStatuses = Object.values(AssignmentStatuses);
    @ViewChild(MatMenuTrigger) public menuTrigger: MatMenuTrigger;

    private assignmentMethods: { [status: string]: () => Observable<any>} = { 
        [AssignmentStatuses.NotOpened]: this.assign,
        // [AssignmentStatuses.Opened]: () => { console.log('opened') },
        // [AssignmentStatuses.Redo]: () => { console.log('redo') },
        // [AssignmentStatuses.Submitted]: () => { console.log('subbmitted') },
    };

    constructor(private assignmentsService: AssignmentsService) { }

    agInit(params: any): void {
        this.params = params;
        this.value = this.params.value || {};
    }

    public getRedoCount() {
        return this.value.redoCount || 0;
    }

    refresh(): boolean {
        return false;
    }

    private getCellClass(cell): object {
        return this.getAssignmentMenuItemClass(cell.status);
    }

    getAssignmentMenuItemClass(assignmentStatus: AssignmentStatuses) {
        return {
            'status-submitted': assignmentStatus == AssignmentStatuses.Submitted,
            'status-opened': assignmentStatus == AssignmentStatuses.Opened,
            'status-redo': assignmentStatus == AssignmentStatuses.Redo,
            'status-done': assignmentStatus == AssignmentStatuses.Done
        };
    }

    changeAssignmentStatusTo(status: AssignmentStatuses) {
        this.assignmentMethods[status] && this.assignmentMethods[status]();
    }

    private assign(): Observable<any> {
        return this.assignmentsService.assign(this.value.activity.id, this.value.user.id);
    }

}