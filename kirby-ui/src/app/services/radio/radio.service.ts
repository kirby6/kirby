import { RadioStation } from './interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as config } from './../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RadioService {
    private _prefix: string = 'radio';
    constructor(private http: HttpClient) { }

    getAll(): Observable<RadioStation[]> {
        return this.http.get<RadioStation[]>(`${config.apiUrl}/${this._prefix}/`);
    }

    getByStationName(name: string): Observable<RadioStation> {
        return this.http.get<RadioStation>(`${config.apiUrl}/${this._prefix}/${name}`);
    }

    create(station: RadioStation): Observable<string> {
        return this.http.post<string>(`${config.apiUrl}/${this._prefix}/`, {...station});
    }
}
