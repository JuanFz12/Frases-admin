import { inject } from "@angular/core";
import { CanMatchFn, Route, Router, UrlSegment } from "@angular/router";
import { AuthService } from "@auth/services";

export const AuthenticatedGuard: CanMatchFn = async (
    route: Route,
    segments: UrlSegment[]
) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const token = authService.token();

    if (!token) {
        router.navigateByUrl('/auth');
        return false;
    }
    if (authService.user()) {
        return true;
    }

    try {
        await authService.checkStatus.mutateAsync();
        return true;
    } catch (err) {
        router.navigateByUrl('/auth');
        return false;
    }
};
