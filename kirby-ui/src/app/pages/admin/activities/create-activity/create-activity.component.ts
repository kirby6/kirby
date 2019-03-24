import { ActivitiesService } from 'src/app/services/activities';
import { NewActivity, Submission } from 'src/app/services/activities/interfaces';
import { ModulesService } from 'src/app/services/modules';
import { Module } from 'src/app/services/modules/interfaces';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications';
import { ActivatedRoute } from '@angular/router';

interface SubmissionCheckbox extends Submission {
    name: string;
    isChecked: boolean;
    data?: object;
}

@Component({
    templateUrl: './create-activity.component.html',
    styleUrls: ['./create-activity.component.scss']
})
export class CreateActivityComponent implements OnInit {
    public name: string;
    public submissions: SubmissionCheckbox[] = [];
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
        let activity = {
            name: this.name,
            files: this.files,
            submissions: this.submissions.filter(s => s.isChecked)
        } as NewActivity;
        this.activitiesService.create(activity).subscribe((activityId) => {
            this.route.paramMap.subscribe(params => {
                let moduleId = params.get('moduleId');
                if (moduleId) {
                    this.modulesService.addActivity(moduleId, activityId).subscribe();
                }
                this.form.nativeElement.reset();
            });
        });
    }

    public showSubmissionSettings(name: string) {
        let submission = this.submissions.find(s => s.name == name);
        return submission && submission.isChecked;
    }

    public addSubmissionData(submissionName: string, data: object) {
        let submission = this.submissions.find(s => s.name == submissionName);
        if (submission) {
            submission.data = data;
        }
    }
}