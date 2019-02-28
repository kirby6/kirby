import { Component, Input, ViewChild } from '@angular/core';
import { File } from './../../services/activities/interfaces'
import { ActivitiesService } from './../../services/activities/index';

@Component({
    selector: 'activity-file-card',
    templateUrl: './activity-file-card.component.html',
    styleUrls: ['./activity-file-card.component.scss']
})
export class ActivityFileCardComponent {
    @Input()
    public activityId: string;
    @Input()
    public file: File;

    @ViewChild('downloadLink')
    private downloadLink;

    constructor(private activitiesService: ActivitiesService) { }

    public onFileClick() {
        this.activitiesService.downloadFile(this.activityId, this.file._id.$oid)
            .subscribe(data => this.downloadFile(data));
    }

    private downloadFile(data) {
        let url = window.URL.createObjectURL(data);
        let link = this.downloadLink.nativeElement;
        link.href = url;
        link.download = this.file.filename;
        link.click();
        window.URL.revokeObjectURL(url);
    }
}
