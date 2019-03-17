import { Component } from '@angular/core';

@Component({
    selector: 'forms-builder',
    templateUrl: './forms-submission-builder.component.html',
    styleUrls: ['./forms-submission-builder.component.scss']
})
export class FormsSubmissionBuilderComponent {
    public form: {components: any[]} = { components: [] };
    onChange(event) {
        console.log(event.form);
    }
}