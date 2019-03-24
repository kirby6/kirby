import { Title } from '../../../interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject, Component } from '@angular/core';

@Component({
    selector: 'form-title-dialog',
    template: `
    <h1 mat-dialog-title>צור כותרת</h1>
    <div mat-dialog-content> 
      <mat-form-field>
        <label>כותרת</label>
        <input autocomplete="off" matInput [(ngModel)]="data.text">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">בטל</button>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>הוסף</button>
    </div>
    `
})
export class FormTitleDialog {

    constructor(
        public dialogRef: MatDialogRef<FormTitleDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Title) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}