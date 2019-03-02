import { AssignmentStatuses } from './../../../../services/assignments/interfaces';
import { Component, OnDestroy } from "@angular/core";

import { ICellRendererAngularComp } from "ag-grid-angular";
import { Cell } from '../interfaces';

@Component({
    selector: 'assignment-cell',
    templateUrl: './assignments-cell.component.html',
    styleUrls: ['./assignments-cell.component.scss']
})
export class AssignmentCellRenderer implements ICellRendererAngularComp {
    public params: any;
    public value;
    public assignmentStatuses = Object.keys(AssignmentStatuses);

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
        return {
            'status-submitted': cell.status == AssignmentStatuses.Submitted,
            'status-opened': cell.status == AssignmentStatuses.Opened,
            'status-redo': cell.status == AssignmentStatuses.Redo,
            'status-done': cell.status == AssignmentStatuses.Done
        };
    }
}