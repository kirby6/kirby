import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as config } from './../../../environments/environment';
import { Comment } from './interfaces';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CommentsService {
    private _prefix: string = 'comments';
    constructor(private http: HttpClient) { }

    getByContext(context: object): Observable<Comment[]> {
        return this.http.put<Comment[]>(`${config.apiUrl}/${this._prefix}/`, context);
    }

    post(comment: Comment, receivingUserIds: string[]): Observable<string> {
        return this.http.post<string>(`${config.apiUrl}/${this._prefix}/`,
            { ...comment, 'receiving_user_ids': receivingUserIds });
    }
}
