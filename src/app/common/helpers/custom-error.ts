export class HttpApiError extends Error {
    constructor(public status: number, message?: string) {
        super(message ?? 'Http error');
        this.name = 'HttpApiError';
        Object.setPrototypeOf(this, HttpApiError.prototype);
    }
}
