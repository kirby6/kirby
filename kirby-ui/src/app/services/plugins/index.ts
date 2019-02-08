import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as config } from './../../../environments/environment';
import { Observable, of as ObservableOf } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PluginsService {
    private _prefix: string = 'available_plugins';
    private _availablePluginsCache: string[] = [];

    constructor(private http: HttpClient) { }

    getAvailablePlugins(): Observable<string[]> {
        if (this._availablePluginsCache.length > 0) {
            return ObservableOf(this._availablePluginsCache);
        }
        return this.http.get<string[]>(`${config.apiUrl}/${this._prefix}/`)
            .pipe(
                map(plugins => this._availablePluginsCache = plugins)
            );
    }
}