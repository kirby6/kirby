import { Assignment, AssignmentStatuses } from './interfaces';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment as config } from './../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AssignmentsService {
    private _prefix: string = 'assignments';
    constructor(private http: HttpClient) { }

    getAll(): Observable<Assignment[]> {
        return this.http.get<Assignment[]>(`${config.apiUrl}/${this._prefix}`);
    }

    get(assignmentId: string): Observable<Assignment[]> {
        return this.http.get<Assignment[]>(`${config.apiUrl}/${this._prefix}/${assignmentId}`);
    }

    getByUserId(userId: string): Observable<Assignment[]> {
        let params = new HttpParams();
        if (userId) {
            params = params.append('user_id', userId);
        }
        return this.http.get<Assignment[]>(`${config.apiUrl}/${this._prefix}/`, { params });
    }

    assign(activityId: string, userId: string): Observable<string> {
        return this.http.post<string>(`${config.apiUrl}/${this._prefix}/`, { 'activity_id': activityId, 'user_id': userId });
    }

    update(assignmentId: string, status: AssignmentStatuses): Observable<void> {
        return this.http.patch<void>(`${config.apiUrl}/${this._prefix}/${assignmentId}`, { status });
    }

    updateRedoCount(assignmentId: string, newRedoCount: number): Observable<number> {
        return this.http.patch<number>(`${config.apiUrl}/${this._prefix}/${assignmentId}/redo`, { 'redo_count': newRedoCount });
    }
}
