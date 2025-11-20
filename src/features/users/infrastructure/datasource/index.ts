import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { HttpApiError, unwrapResponse } from "@common/helpers";
import { PaginationParams, User, Pagination, CreateUser, UpdateUser, BackendResponse } from "@common/interfaces";
import { UserEntity, UsersDataSource } from "@features/users";
import { firstValueFrom, map } from "rxjs";
import { UserModelResponse, UsersModelResponse } from "../model";
import { environment } from "src/environments/environment";
const baseUrl = environment.apiUrl;

@Injectable()
export class UsersDatasourceImpl implements UsersDataSource {
    private http = inject(HttpClient);
    async getUsers({ limit, page }: PaginationParams): Promise<{ users: User[]; pagination: Pagination; }> {
        try {
            const response = await firstValueFrom(
                unwrapResponse(
                    this.http.get<BackendResponse<UsersModelResponse>>(`${baseUrl}/users`, {
                        params: { limit, page },
                    })
                ).pipe(map((res) => ({ users: res.users.map((user) => UserEntity.toJson(user)), pagination: res.pagination })))
            );
            return { pagination: response.pagination, users: response.users };
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
    async getUserById(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async createUser(user: CreateUser): Promise<User> {
        try {
            const response = await firstValueFrom(
                unwrapResponse(
                    this.http.post<BackendResponse<UserModelResponse>>(`${baseUrl}/users`, user)
                ).pipe(map((user) => (UserEntity.toJson(user))))
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
    async updateUser(id: number, user: UpdateUser): Promise<User> {
        try {
            console.log({user})
            const response = await firstValueFrom(
                unwrapResponse(
                    this.http.patch<BackendResponse<UserModelResponse>>(`${baseUrl}/users/${id}`, user)
                ).pipe(map((user) => (UserEntity.toJson(user))))
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
    async deleteUser(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}