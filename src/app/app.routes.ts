import { Routes } from '@angular/router';
import { InternalErrorComponent } from './shared/common/internal-error/internal-error.component';
import { adminGuard } from './core/guards/admin.guard';

export const APP_ROUTES: Routes = [
    {
        path: 'admin',
        loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
        canActivate: [adminGuard]
    },
    {path: 'internal-error', component: InternalErrorComponent},
    {path: '**', redirectTo: 'admin'}
    // Here add new pages component
    /* {path: '**', component: NotFoundComponent} */ // This line will remain down from the whole pages component list
];
