import { Pagination } from "@common/interfaces";

export interface UsersModelResponse {
    users: UserModelResponse[];
    pagination: Pagination;
}

interface UserModelResponse {
    id: number;
    name: string;
    status: string;
    email: string;
}
