import { Component, Input } from '@angular/core';
import { Assignment } from 'src/app/services/assignments/interfaces';

@Component({
    selector: 'git-submission',
    template: 'יש להגיש את התרגיל בקישור: <a href="{submission.git_submission_url}}">{{submission.git_submission_url}}</a>',
    styles: [
        ':host { font-weight: 500; font-size: 16px; }',
        'a { color: rgba(255, 255, 255, 0.7); }',
    ]
})
export class GitSubmissionComponent {
    @Input()
    public submission: object;
}
