import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class NotificationsService {
    private defaultEventName = 'message';

    constructor(private socket: Socket) { }

    sendMessage(message: string) {
        this.socket.emit(this.defaultEventName, message);
    }

    getMessage<T>(): Observable<T> {
        return this.socket.fromEvent<T>(this.defaultEventName);
    }
}
