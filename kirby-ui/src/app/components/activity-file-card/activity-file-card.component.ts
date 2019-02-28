import { Component, Input } from '@angular/core';
import { File } from './../../services/activities/interfaces'

@Component({
    selector: 'activity-file-card',
    templateUrl: './activity-file-card.component.html',
    styleUrls: ['./activity-file-card.component.scss']
})
export class ActivityFileCardComponent {
    @Input()
    public file: File;

    public onFileClick() {
        console.log(this.file);
    }
}
