import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Group } from './interfaces';
import { environment as config } from './../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class GroupService {
    private _prefix: string = 'groups';
    constructor(private http: HttpClient) { }

    getAll(): Observable<Group[]> {
        return this.http.get<Group[]>(`${config.apiUrl}/${this._prefix}/`);
    }

    getById(id: number): Observable<Group> {
        return this.http.get<Group>(`${config.apiUrl}/${this._prefix}/${id}`);
    }

    create(group: Group): Observable<Group> {
        return this.http.post<Group>(`${config.apiUrl}/${this._prefix}/`, group);
    }
}
