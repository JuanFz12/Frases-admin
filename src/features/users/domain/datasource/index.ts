import { CoreUser, Pagination, PaginationParams, UpdateUser, User } from "@common/interfaces";

export abstract class UsersDataSource {
    abstract getUsers(paginationParams: PaginationParams): Promise<{ users: User[]; pagination: Pagination }>;
    abstract getUserById(id: number): Promise<User>;
    abstract createUser(user: CoreUser): Promise<User>;
    abstract updateUser(id: number, user: UpdateUser): Promise<User>;
    abstract deleteUser(id: number): Promise<void>;
}