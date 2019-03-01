import { Group } from './../groups/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './interfaces';
import { environment as config } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { ObjectId } from 'src/app/utils/interfaces';


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

    addUserToGroup(user: User, groupId: ObjectId) {
        return this.http.post<User>(`${config.apiUrl}/${this._prefix}/`, {user_id: user._id.$oid, group_id: groupId});
    }
}
