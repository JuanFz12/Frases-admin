import { CreateUser, Pagination, PaginationParams, UpdateUser, User } from "@common/interfaces";

export abstract class UsersRepository {
    abstract getUsers(paginationParams: PaginationParams): Promise<{ users: User[]; pagination: Pagination }>;
    abstract getUserById(id: number): Promise<User>;
    abstract createUser(user: CreateUser): Promise<User>;
    abstract updateUser(id: number, user: UpdateUser): Promise<User>;
    abstract deleteUser(id: number): Promise<void>;
}