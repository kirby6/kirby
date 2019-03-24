import { TextInput } from './../../../interfaces';
import { Title } from '../../../interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject, Component } from '@angular/core';

@Component({
  selector: 'form-text-input-dialog',
  template: `
    <h1 mat-dialog-title>צור שאלה פתוחה</h1>
    <div mat-dialog-content> 
      <mat-form-field>
        <label>שאלה</label>
        <input autocomplete="off" matInput [(ngModel)]="data.question">
      </mat-form-field>
      <mat-form-field>
        <label>placeholder</label>
        <input autocomplete="off" matInput [(ngModel)]="data.placeholder">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">בטל</button>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>הוסף</button>
    </div>
    `
})
export class FormTextInputDialog {
  public data: TextInput = { question: "", placeholder: "" } as TextInput;

  constructor(public dialogRef: MatDialogRef<FormTextInputDialog>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}