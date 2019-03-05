import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { Observable } from 'rxjs';

import { AuthenticationService } from '../authentication';
import { environment } from '../../../environments/environment';

class AuthorizedSocket extends Socket {
    constructor(token) {
        if (token) {
            environment.socketio.options.extraHeaders = {
                Authorization: `Bearer ${token}`
            }
        }
        super(environment.socketio);
    }
}

@Injectable({ providedIn: 'root' })
export class NotificationsService {
    private defaultEventName = 'message';
    private socket: AuthorizedSocket;

    constructor(
        private authenticationService: AuthenticationService) {
        let currentUser = this.authenticationService.currentUserValue;
        let options = {};
        let token = null;
        if (currentUser && currentUser.token) {
            token = currentUser.token;
        }
        this.socket = new AuthorizedSocket(token);
    }

    sendMessage(message: string) {
        return this.socket.emit(this.defaultEventName, message);
    }

    getMessage<T>(): Observable<T> {
        return this.socket.fromEvent<T>(this.defaultEventName);
    }
}
