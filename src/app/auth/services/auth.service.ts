import { computed, inject, Injectable, signal } from "@angular/core";
import { injectMutation, QueryClient } from "@tanstack/angular-query-experimental";
import { HttpApiError } from "../../common/helpers/custom-error";
import { User } from "../../common/interfaces";
import { AuthActions } from "../actions/auth.action";

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({ providedIn: 'root' })
export class AuthService {
    //*Injections
    private readonly authActions = inject(AuthActions);
    private _authStatus = signal<AuthStatus>('checking');
    private _user = signal<User | null>(null);
    private _token = signal<string | null>(localStorage.getItem('token'));

    private _errorMessage = signal<{ message: string, status: number } | null>(null);
    errorMessage = computed(this._errorMessage);

    token = computed(this._token);
    authStatus = computed<AuthStatus>(() => {
        if (this._authStatus() === 'checking') return 'checking';

        if (this._user()) {
            return 'authenticated';
        }

        return 'not-authenticated';
    });


    queryClient = inject(QueryClient);

    login = injectMutation(() => ({
        mutationFn: (credentials: { email: string; password: string }) =>
            this.authActions.login(credentials.email, credentials.password),
        onSuccess: (resp) => {
            this.handleAuthSuccess(resp);
            this.queryClient.invalidateQueries();
        },
        onError: (err: HttpApiError) => {
            this._authStatus.set('not-authenticated');
            this._errorMessage.set({
                message: err.message ?? 'Credenciales incorrectas',
                status: err.status ?? 400,
            });
            console.error('❌ Error login', err.message);
        }
    }));
    checkStatus = injectMutation(() => ({
        mutationFn: () => this.authActions.checkStatus(),
        onSuccess: (resp) => {
            console.log({resp})
            this.handleAuthSuccess(resp);
        },

        onError: (err: HttpApiError) => {
            console.error('❌ Error checking status', err);
            this._errorMessage.set({ message: err.message ?? 'Error verificando sesión', status: err.status ?? 500 });
            this.logout();
        }
    }));

    private handleAuthSuccess({ token, user }: { token: string; user: User }) {
        this._user.set(user);
        this._authStatus.set('authenticated');
        this._token.set(token);
        localStorage.setItem('token', token);

        return true;
    }
    logout() {
        this._user.set(null);
        this._token.set(null);
        this._authStatus.set('not-authenticated');

        localStorage.removeItem('token');
    }
}
