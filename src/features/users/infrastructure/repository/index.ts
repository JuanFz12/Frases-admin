import { PaginationParams, User, Pagination, CreateUser, UpdateUser } from '@common/interfaces';
import { inject, Injectable } from '@angular/core';
import { UsersDataSource, UsersRepository } from '@features/users/domain';
@Injectable()
export class UsersRepositoryImpl implements UsersRepository {
    private readonly datasource = inject(UsersDataSource);
    getUsers(paginationParams: PaginationParams): Promise<{ users: User[]; pagination: Pagination; }> {
        return this.datasource.getUsers(paginationParams);
    }
    getUserById(id: number): Promise<User> {
        return this.datasource.getUserById(id);
    }
    createUser(user: CreateUser): Promise<User> {
        return this.datasource.createUser(user);
    }
    updateUser(id: number, user: UpdateUser): Promise<User> {
        return this.datasource.updateUser(id, user);
    }
    deleteUser(id: number): Promise<void> {
        return this.datasource.deleteUser(id);
    }
}