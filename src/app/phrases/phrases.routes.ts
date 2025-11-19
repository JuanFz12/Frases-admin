import { Routes } from '@angular/router';
import { PhrasesPage } from './pages/phrases-page/phrases-page';


export const phrasesRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: PhrasesPage,
            },
        ],
       /*  providers: [
            { provide: PhrasesDataSource, useClass: PhrasesDataSourceImpl },
            { provide: PhrasesRepository, useClass: PhrasesRepositoryImpl },
            GetPhrasesUseCase
        ] */
    },
    { path: '**', redirectTo: '' },
]
export default phrasesRoutes;