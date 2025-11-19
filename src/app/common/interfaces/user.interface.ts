export interface User {
    id: number;
    name: string;
    status: string;
    email: string;
}

export type CoreUser = Omit<User, 'id'>;
export type UpdateUser = Partial<CoreUser>;