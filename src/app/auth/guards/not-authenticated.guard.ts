import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const NotAuthenticatedGuard: CanMatchFn = async (
    route: Route,
    segments: UrlSegment[]
) => {
    const authService = inject(AuthService);
    const { mutateAsync } = authService.checkStatus;
    const router = inject(Router);
    if (!authService.token()) {
        return true;
    }
    try {
        await mutateAsync();
        router.navigateByUrl('/admin');
        return false;
    } catch (err) {
        return true;
    }
};