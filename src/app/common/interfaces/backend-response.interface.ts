export interface BackendResponse<T> {
    status: string;
    message: string;
    data: T;
    error: null | string;
}