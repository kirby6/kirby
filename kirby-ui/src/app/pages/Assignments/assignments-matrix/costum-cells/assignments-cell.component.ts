import { Component, OnDestroy } from "@angular/core";

import { ICellRendererAngularComp } from "ag-grid-angular";
import { Cell } from '../interfaces';
import { AssignmentStatuses } from 'src/app/services/assignments/interfaces';

@Component({
    selector: 'assignment-cell',
    template: `<div [ngClass]="getCellClass(value)">{{getRedoCount()}}</div>`,
    styles: [`
        .status-opened {
            background: gray;
        }
    
        .status-done {
            background: green;
        }
        
        .status-submitted {
            background: red;
        }
    
        .status-redo {
            background: yellow;
            color: black;
        }
    `]
})
export class AssignmentCellRenderer implements ICellRendererAngularComp {
    public params: any;
    public value;

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

    private getCellClass(cell: Cell, i: number): object {
        return {
            'status-submitted': cell.status == AssignmentStatuses.Submitted,
            'status-opened': cell.status == AssignmentStatuses.Opened,
            'status-redo': cell.status == AssignmentStatuses.Redo,
            'status-done': cell.status == AssignmentStatuses.Done
        };
    }
}