import { Component } from '@angular/core';
import { FormComponent, Title, TextInput, RadioInput } from '../interfaces';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

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
}