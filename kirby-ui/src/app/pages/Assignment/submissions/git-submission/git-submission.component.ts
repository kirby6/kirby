import { Component, Input } from '@angular/core';
import { Assignment } from 'src/app/services/assignments/interfaces';

@Component({
    selector: 'git-submission',
    template: 'יש להגיש את התרגיל בקישור:<br/><a href="{{submission.git.url}}">{{submission.git.url}}</a>',
    styles: [
        ':host { font-weight: 500; font-size: 16px; }',
        'a { color: rgba(255, 255, 255, 0.7); }',
    ]
})
export class GitSubmissionComponent {
    @Input()
    public submission;
}
