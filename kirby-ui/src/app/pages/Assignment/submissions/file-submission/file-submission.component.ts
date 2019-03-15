import { Component, Input } from '@angular/core';

@Component({
    selector: 'file-submission',
    template: 'יש להגיש את התרגיל בקובץ',
    styles: [
        ':host { font-weight: 500; font-size: 16px; }',
    ]
})
export class FileSubmissionComponent {
    @Input()
    public submission;
}
