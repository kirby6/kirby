import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as config } from './../../../environments/environment';
import { Activity, NewActivity } from './interfaces';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ActivitiesService {
    private _prefix: string = 'activities';
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Activity[]>(`${config.apiUrl}/${this._prefix}/`);
    }

    create(activity: NewActivity): Observable<string> {
        let formData = new FormData();
        formData.append('name', activity.name);
        let submissions = activity.submissions.reduce((total, submission) => {
            total[submission.name] = submission.data;
            return total;
        }, {});
        formData.append('submissions', JSON.stringify(submissions));
        if (activity.files) {
            for (let i = 0; i < activity.files.length; i++) {
                formData.append(activity.files[i].name, activity.files[0], activity.files[0].name);
            }
        }
        return this.http.post<string>(`${config.apiUrl}/${this._prefix}/`, formData);
    }

    downloadFile(activity_id: string, file_id: string): Observable<Blob> {
        return this.http.get<Blob>(`${config.apiUrl}/${this._prefix}/${activity_id}/files/${file_id}`,
            { responseType: 'blob' as 'json' });
    }

    getAvailableSubmissions(): Observable<string[]> {
        return this.http.get<string[]>(`${config.apiUrl}/${this._prefix}/submissions`);
    }
}
