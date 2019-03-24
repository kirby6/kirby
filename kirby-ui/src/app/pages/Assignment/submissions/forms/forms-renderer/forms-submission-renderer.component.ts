import { Component } from '@angular/core';
import { FormComponent, Title, TextInput, RadioInput } from '../interfaces';

@Component({
    selector: 'forms-renderer',
    templateUrl: './forms-submission-renderer.component.html',
    styleUrls: ['./forms-submission-renderer.component.scss']
})
export class FormsSubmissionRendererComponent {
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
        } as RadioInput
    ];

    onTextAnswered(s) {
        console.log(s);
    }
} 