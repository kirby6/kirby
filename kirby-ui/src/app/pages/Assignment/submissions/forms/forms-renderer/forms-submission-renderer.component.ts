import { Component, Input } from '@angular/core';
import { FormComponent, Title, TextInput, RadioInput, RadioOption } from '../interfaces';

@Component({
    selector: 'forms-renderer',
    templateUrl: './forms-submission-renderer.component.html',
    styleUrls: ['./forms-submission-renderer.component.scss']
})
export class FormsSubmissionRendererComponent {
    @Input() public components: FormComponent[];
    
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