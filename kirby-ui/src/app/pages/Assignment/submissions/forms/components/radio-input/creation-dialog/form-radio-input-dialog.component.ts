import { RadioInput, RadioOption } from './../../../interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject, Component } from '@angular/core';

@Component({
    selector: 'form-radio-input-dialog',
    template: `
    <h1 mat-dialog-title>צור שאלה פתוחה</h1>
    <div mat-dialog-content> 
      <mat-form-field>
        <label>שאלה</label>
        <input autocomplete="off" matInput [(ngModel)]="data.question">
      </mat-form-field>
      <mat-form-field *ngFor="let option of data.options">
        <label>תשובה אפשרית</label>
        <input autocomplete="off" matInput [(ngModel)]="option.label">
      </mat-form-field>
      <button mat-button (click)="addOption()">הוסף תשובה</button>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">בטל</button>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>הוסף</button>
    </div>
    `
})
export class FormRadioInputDialog {

    constructor(
        public dialogRef: MatDialogRef<FormRadioInputDialog>,
        @Inject(MAT_DIALOG_DATA) public data: RadioInput) { }

    ngOnInit() {
        this.data.options = this.data.options || [];
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    addOption() {
        this.data.options.push({ label: "" } as RadioOption);
    }


}