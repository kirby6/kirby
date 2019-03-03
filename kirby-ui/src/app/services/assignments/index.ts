import { Assignment, AssignmentStatuses } from './interfaces';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment as config } from './../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AssignmentsService {
    private _prefix: string = 'assignments';
    constructor(private http: HttpClient) { }

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

    assign(assignment: Assignment): Observable<string> {
        return this.http.post<string>(`${config.apiUrl}/${this._prefix}/`, assignment);
    }

    update(assignmentId: string, status: AssignmentStatuses): Observable<void> {
        return this.http.patch<void>(`${config.apiUrl}/${this._prefix}/${assignmentId}`, { status });
    }
}
