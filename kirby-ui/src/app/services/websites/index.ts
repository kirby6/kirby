import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Website } from './interfaces';
import { environment as config } from './../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class WebsiteService {
    private _prefix: string = 'websites';
    constructor(private http: HttpClient) { }

    getAll(): Observable<Website[]> {
        return this.http.get<Website[]>(`${config.apiUrl}/${this._prefix}/`);
    }
}
