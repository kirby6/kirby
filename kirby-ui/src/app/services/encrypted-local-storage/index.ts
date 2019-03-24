import { Injectable } from '@angular/core';
import * as SecureLS from 'secure-ls';

@Injectable({ providedIn: 'root' })
export class EncryptedLocaStorageService {
    public encryptedData = new SecureLS({encodingType: 'aes'});
}
