import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const NotAuthenticatedGuard: CanMatchFn = async (
    route: Route,
    segments: UrlSegment[]
) => {
    const authService = inject(AuthService);
    const token = authService.token();
    const { mutateAsync } = authService.checkStatus;
    const router = inject(Router);
    if (!token) {
        return true;
    }
    try {
        await mutateAsync();
        return router.navigateByUrl('/admin');
    } catch (err) {
        return true;
    }
};