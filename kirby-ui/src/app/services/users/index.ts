import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './interfaces';
import { environment as config } from './../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UserService {
    private _prefix: string = 'users';
    constructor(private http: HttpClient) { }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`${config.apiUrl}/${this._prefix}/`);
    }

    getById(id: number): Observable<User> {
        return this.http.get<User>(`${config.apiUrl}/${this._prefix}/${id}`);
    }

    register(user: User): Observable<User> {
        return this.http.post<User>(`${config.apiUrl}/${this._prefix}/`, user);
    }
}
