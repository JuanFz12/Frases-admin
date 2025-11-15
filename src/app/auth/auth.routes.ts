import { Routes } from "@angular/router";
import { LoginPage } from "./pages/login-page/login-page";

const authRoutes: Routes = [
    {
        path: 'auth',
        children: [
            { path: 'login', component: LoginPage },
        ],
    },
    {
        path: '**',
        redirectTo: 'auth/login',
    },
];
export default authRoutes;