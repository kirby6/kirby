import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as config } from './../../../environments/environment';
import { Activity } from './interfaces';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ActivitiesService {
    private _prefix: string = 'activities';
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Activity[]>(`${config.apiUrl}/${this._prefix}/`);
    }

    create(activity: Activity): Observable<Activity> {
        return this.http.post<Activity>(`${config.apiUrl}/${this._prefix}/`, activity);
    }

    downloadFile(activity_id: string, file_id: string): Observable<Blob> {
        return this.http.get<Blob>(`${config.apiUrl}/${this._prefix}/${activity_id}/files/${file_id}`,
            { responseType: 'blob' as 'json' });
    }
}
