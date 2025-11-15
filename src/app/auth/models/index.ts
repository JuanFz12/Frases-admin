export interface LoginResponse {
    user: User;
    token: string;
}

export interface User {
    id: number;
    name: string;
    status: string;
    email: string;
}
