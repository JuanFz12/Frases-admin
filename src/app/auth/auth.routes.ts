import { Routes } from "@angular/router";
import { LoginPage } from "./pages/login-page/login-page";

const authRoutes: Routes = [
    { path: 'login', component: LoginPage },
    {
        path: '**',
        redirectTo: 'login',
    },
];
export default authRoutes;