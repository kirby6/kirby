import { Component, Input, Output, EventEmitter } from '@angular/core';

interface GitSubmissionData {
    base_url: string;
}

@Component({
    selector: 'git-submission-settings',
    templateUrl: './git-submission-settings.component.html',
    styleUrls: ['./git-submission-settings.component.scss']
})
export class GitSubmissionSettingsComponent {
    @Input()
    public inputLabel: string;
    @Input()
    public buttonLabel: string;

    @Output()
    public onChange: EventEmitter<object> = new EventEmitter();

    public emitOnChange(input: string) {
        this.onChange.emit({ base_url: input } as GitSubmissionData);
    }
} 
