import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as config } from './../../../environments/environment';
import { Help } from './interfaces';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class HelpsService {
    private _prefix: string = 'helps';
    constructor(private http: HttpClient) { }

    getAll(): Observable<Help[]> {
        return this.http.get<Help[]>(`${config.apiUrl}/${this._prefix}/`);
    }

    getSent(): Observable<Help[]> {
        return this.http.get<Help[]>(`${config.apiUrl}/${this._prefix}/sent`);
    }

    get(id: string): Observable<Help> {
        return this.http.get<Help>(`${config.apiUrl}/${this._prefix}/${id}`);
    }

    create(help: Help): Observable<Help> {
        return this.http.post<Help>(`${config.apiUrl}/${this._prefix}/`, help);
    }
}
