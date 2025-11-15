import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AppHttpError {
    status: number;
    message: string;
}

@Injectable({ providedIn: 'root' })
export class ErrorService {
    private readonly _errors = new Subject<AppHttpError>();
    readonly errors$ = this._errors.asObservable();

    notify(error: AppHttpError) {
        this._errors.next(error);
    }
}
