import { Component } from '@angular/core';
import { FormComponent, Title, TextInput, RadioInput, RadioOption } from '../interfaces';

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
        } as RadioInput,
        {
            type: 'title',
            text: "שאלה נוספת??"
        } as Title,
    ];

    onTextAnswered(component: TextInput, answer: string) {
        component.answer = answer;
    }

    onRadioSelected(component: RadioInput, selectedOptionLabel: string) {
        this._clearSelectedRadioOptions(component.options);
        let selectedOptionRef = component.options.find(c => c.label === selectedOptionLabel) || {} as RadioOption;
        selectedOptionRef.selected = true;
    }

    private _clearSelectedRadioOptions(options: RadioOption[]): RadioOption[] {
        options.forEach(c => c.selected = false);
        return options;
    }
} 