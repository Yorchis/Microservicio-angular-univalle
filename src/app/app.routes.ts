import { RouterModule, Routes } from '@angular/router';
import { NoPagefoundComponent } from "./layout/nopagefound/nopagefound.component";
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './guards/auth.guard';

const ROUTES: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('../app/pages/child-routes.module').then(m => m.ChildRoutesModule)
  },
  { path: '**', component: NoPagefoundComponent },
]

export const APP_ROUTES = RouterModule.forRoot(ROUTES, { useHash: true })
