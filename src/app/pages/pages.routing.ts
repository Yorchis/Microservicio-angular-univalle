import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';

const ROUTES: Routes = [
    {
        path: '',
        component: PagesComponent,  
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule)
    },
];

export const PAGES_ROUTES = RouterModule.forChild(ROUTES);
