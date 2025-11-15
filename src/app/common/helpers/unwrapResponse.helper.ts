import { map, Observable } from "rxjs";
import { BackendResponse } from "../interfaces/backend-response.interface";

export function unwrapResponse<T>(obs: Observable<BackendResponse<T>>): Observable<T> {
    return obs.pipe(map((res) => res.data));
}