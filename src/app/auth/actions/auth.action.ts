import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom, map } from "rxjs";
import { environment } from "../../../environments/environment";
import { BackendResponse, User } from "@common/interfaces";
import { HttpApiError, unwrapResponse } from "@common/helpers";
import { AdminEntity } from "@auth/entities";
import { LoginResponse } from "@auth/models";
const baseUrl = environment.apiUrl;
@Injectable({ providedIn: 'root' })
export class AuthActions {
    private http = inject(HttpClient);
    async checkStatus(): Promise<{ token: string; user: User; }> {
        try {
            const response = await firstValueFrom(
                unwrapResponse(
                    this.http.get<BackendResponse<LoginResponse>>(`${baseUrl}/auth/check-status`)
                ).pipe(map(({ user, token }) => ({
                    token: token,
                    user: new AdminEntity({ id: user.id, name: user.name, email: user.email, status: user.status })
                })))
            );
            console.log({response})
            return response;
        } catch (err: any) {
            const message = `${err.error.message} Reason: ${err.error.error}`;
            const status =
                err?.status ??
                err?.statusCode ??
                err?.response?.status ??
                err?.error?.status ??
                500;
            throw new HttpApiError(status, message);
        }
    }

    async login(email: string, password: string): Promise<{ token: string; user: User; }> {
        try {
            const response = await firstValueFrom(
                unwrapResponse(
                    this.http.post<BackendResponse<LoginResponse>>(`${baseUrl}/auth/login`, {
                        email,
                        password,
                    })
                ).pipe(map(({ user, token }) => ({
                    token: token,
                    user: new AdminEntity({ id: user.id, name: user.name, email: user.email, status: user.status })
                })))
            );
            return response;
        } catch (err: any) {
            const message = `${err.error.message} Reason: ${err.error.error}`;
            const status =
                err?.status ??
                err?.statusCode ??
                err?.response?.status ??
                err?.error?.status ??
                500;
            throw new HttpApiError(status, message);
        }
    }
}