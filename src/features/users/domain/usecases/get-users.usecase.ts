import { inject, Injectable } from "@angular/core";
import { Pagination, PaginationParams, User } from "@common/interfaces";
import { UsersRepository } from "../repository";

interface Users {
    execute(paginationParams: PaginationParams): Promise<{ users: User[]; pagination: Pagination }>;
}
@Injectable({ providedIn: 'root' })
export class GetUsersUsecase implements Users {
    private readonly repository = inject(UsersRepository);
    async execute(paginationParams: PaginationParams): Promise<{ users: User[]; pagination: Pagination }> {
        return this.repository.getUsers(paginationParams);
    }
}