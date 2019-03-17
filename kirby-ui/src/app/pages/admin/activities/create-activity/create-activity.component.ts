import { ActivitiesService } from 'src/app/services/activities';
import { NewActivity } from 'src/app/services/activities/interfaces';
import { ModulesService } from 'src/app/services/modules';
import { Module } from 'src/app/services/modules/interfaces';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './create-activity.component.html',
    styleUrls: ['./create-activity.component.scss']
})
export class CreateActivityComponent implements OnInit {
    private moduleId: string;
    public name: string;
    public submissions: { name: string, isChecked: boolean }[];
    public files: FileList;

    @ViewChild('form') private form;
    @ViewChild('fileInput') private fileInput;

    constructor(
        private notificationsService: NotificationsService,
        private activitiesService: ActivitiesService,
        private modulesService: ModulesService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.activitiesService.getAvailableSubmissions().subscribe(availableSubmissions => {
            this.submissions = availableSubmissions.map((s) => {
                return {
                    name: s,
                    isChecked: false
                };
            });
        });
    }

    public uploadFiles() {
        this.files = this.fileInput.nativeElement.files;
    }

    public submit() {
        if (!this.name) return;
        this.route.paramMap.subscribe(params => {
            this.moduleId = params.get('moduleId');
            let activity = {
                name: this.name,
                files: this.files,
                submissions: this.submissions.filter(s => s.isChecked).map(s => s.name)
            } as NewActivity;
            this.activitiesService.create(activity).subscribe()
            this.form.nativeElement.reset();
        });
    }
}
