import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as config } from './../../../environments/environment';
import { Module } from './interfaces';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ModulesService {
    private _prefix: string = 'modules';
    constructor(private http: HttpClient) { }

    getAll(): Observable<Module[]> {
        return this.http.get<Module[]>(`${config.apiUrl}/${this._prefix}/`);
    }

    getById(id: string): Observable<Module> {
        return this.http.get<Module>(`${config.apiUrl}/${this._prefix}/${id}`);
    }

    create(name: string, parent?: string): Observable<string> {
        return this.http.post<string>(`${config.apiUrl}/${this._prefix}/`, { name, parent });
    }

    addActivity(moduleId: string, activityId: string): Observable<Module> {
        return this.http.post<Module>(`${config.apiUrl}/${this._prefix}/${moduleId}`, { activity_id: activityId });
    }
}
