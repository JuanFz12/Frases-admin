import { Routes } from '@angular/router';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';

export const dashboardRoutes: Routes = [
    {
        path: '',
        component: DashboardLayout,
        children: [
            { path: '', redirectTo: 'phrases', pathMatch: 'full' },
            {
                path: 'phrases',
                loadChildren: () => import('../phrases/phrases.routes'),
            },
            {
                path: 'users',
                loadChildren: () => import('../users/users.routes'),
            },
        ],
       
    },
    { path: '**', redirectTo: '' },
]
export default dashboardRoutes;