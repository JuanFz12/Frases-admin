import { Routes } from '@angular/router';
import { UsersPage } from './pages/users-page/users-page';

export const usersRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: UsersPage
            },
        ],
    },
    { path: '**', redirectTo: '' },
]
export default usersRoutes;