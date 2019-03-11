import { ActivitiesService } from 'src/app/services/activities';
import { Component, ViewChild, Inject } from '@angular/core';
import { File, Activity } from './../../../services/activities/interfaces'
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

export interface ActivityAndFiles {
    activity: Activity;
    files: File[];
}


@Component({
    selector: 'activity-file',
    templateUrl: './activity-file.component.html',
    styleUrls: ['./activity-file.component.scss']
})
export class ActivityFileComponent {

    @ViewChild('downloadLink') private downloadLink;

    constructor(private activityFileComponentRef: MatBottomSheetRef<ActivityFileComponent>,
        private activitiesService: ActivitiesService,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: ActivityAndFiles) { }


    openLink(activity: Activity, file: File): void {
        this.activitiesService.downloadFile(activity.id, file.id).subscribe(data => {
            this.downloadFile(file.filename, data);
            this.activityFileComponentRef.dismiss();
        });
    }


    private downloadFile(filename, data) {
        let url = window.URL.createObjectURL(data);
        let link = this.downloadLink.nativeElement;
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
    }
}
