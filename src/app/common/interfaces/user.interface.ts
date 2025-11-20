export interface User {
    id: number;
    name: string;
    status: string;
    email: string;
}

type CoreUser = Omit<User, 'id'>;
export interface CreateUser extends CoreUser {
    password: string;
}
export type UpdateUser = Partial<CoreUser>;
