import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as config }  from './../../../environments/environment';
import { Excercise } from './interfaces';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ExercicesService {
    private _prefix: string = 'excercises';
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Excercise[]>(`${config.apiUrl}/${this._prefix}/`);
    }

    create(excercise: Excercise): Observable<Excercise> {
        return this.http.post<Excercise>(`${config.apiUrl}/${this._prefix}/`, excercise);
    }
}