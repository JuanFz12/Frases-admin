import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaginationService {
    activatedRoute = inject(ActivatedRoute);
    router = inject(Router);
    currentPage = toSignal(this.activatedRoute.queryParamMap.pipe(
        map(params => (params.get('page') ? +params.get('page')! : 1)),
        map(page => (isNaN(page) ? 1 : page))
    ), { initialValue: 1 });
    currentLimit = toSignal(
        this.activatedRoute.queryParamMap.pipe(
            map(params => Number(params.get('limit') ?? 10)),
            map(limit => (isNaN(limit) || limit <= 0 ? 10 : limit))
        ),
        { initialValue: 10 }
    );

    setQueryParams(params: { page?: number; limit?: number }) {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: params,
            queryParamsHandling: 'merge',
        });
    }

}