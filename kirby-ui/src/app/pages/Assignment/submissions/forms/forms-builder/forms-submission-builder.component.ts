import { FormTextInputDialog } from './../components/text-input/creation-dialog/form-text-input-dialog.component';
import { FormTitleDialog } from './../components/title/creation-dialog/form-title-dialog.component';
import { Component } from '@angular/core';
import { FormComponent, Title, TextInput, RadioInput } from '../interfaces';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { FormRadioInputDialog } from '../components/radio-input/creation-dialog/form-radio-input-dialog.component';

@Component({
    selector: 'delete-confirmation-dialog',
    template: `
    <div mat-dialog-content>
      <p>אתה בטוח שאתה רוצה למחוק?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">לא</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>כן</button>
    </div>
    `
  })
  export class DeleteConfirmationDialog {
    constructor(public dialogRef: MatDialogRef<DeleteConfirmationDialog>) {}
    onNoClick(): void {
      this.dialogRef.close();
    }
  }

@Component({
    selector: 'forms-builder',
    templateUrl: './forms-submission-builder.component.html',
    styleUrls: ['./forms-submission-builder.component.scss']
})
export class FormsSubmissionBuilderComponent {
    public components: FormComponent[] = [
        {
            type: 'title',
            text: "איזה מספר??"
        } as Title,
        {
            type: 'text',
            question: "1. הכנס טקסט?",
            placeholder: "אני טקסט"
        } as TextInput,
        {
            type: 'radio',
            question: "2. מה המספר הכי טוב בעולם??",
            options: [
                {
                    label: "2"
                },
                {
                    label: "6",
                    selected: true
                }
            ]
        } as RadioInput,
        {
            type: 'title',
            text: "שאלה נוספת??"
        } as Title,
    ];
    constructor(public dialog: MatDialog, public snackBar: MatSnackBar) { }


    createTitle(text: string): Title {
        return { type: 'title', text } as Title;
    }

    createTextInput(question: string, placeholder?: string): TextInput {
        return {
            type: 'text',
            question,
            placeholder
        } as TextInput;
    }

    createRadioInput(question: string, options: string[]): RadioInput {
        return {
            type: 'radio',
            question,
            options: options.map(o => ({ label: o, selected: false }))
        } as RadioInput;
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.components, event.previousIndex, event.currentIndex);
        console.log(this.components);
    }

    openTitleCreationDialog() {
        const dialogRef = this.dialog.open(FormTitleDialog, {
            width: '250px'
        });

        dialogRef.afterClosed().subscribe((result: Title) => {
            if (result && result.text) {
                this.components.push(this.createTitle(result.text));
            }
        });
    }

    openTextInputCreationDialog() {
        const dialogRef = this.dialog.open(FormTextInputDialog, {
            width: '250px'
        });

        dialogRef.afterClosed().subscribe((result: TextInput) => {
            if (result && result.question) {
                this.components.push(this.createTextInput(result.question, result.placeholder));
            }
        });
    }

    openRadioInputCreationDialog() {
        const dialogRef = this.dialog.open(FormRadioInputDialog, {
            width: '250px'
        });

        dialogRef.afterClosed().subscribe((result: RadioInput) => {
            console.log(result);
            if (result && result.question && result.options.length > 0) {
                let options = result.options.map(o => o.label).filter(o => o);
                this.components.push(this.createRadioInput(result.question, options));
            }
        });
    }

    deleteComponent(index: number) {
        const dialogRef = this.dialog.open(DeleteConfirmationDialog, {
            width: '250px'
        });

        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
                this.components.splice(index, 1);
            }
        });
    }
}