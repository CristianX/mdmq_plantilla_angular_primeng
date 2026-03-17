import { Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { UsuariosComponent } from './administracion/usuarios/usuarios.component';
import { RolesComponent } from './administracion/roles/roles.component';
import { PerfilesComponent } from './administracion/perfiles/perfiles.component';
import { RecomendacionComponent } from './recomendacion/recomendacion.component';
import { AuthGuard } from '../../core/guards/auth.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'administracion',
        children: [
          {
            path: 'usuarios',
            component: UsuariosComponent
          },
          {
            path: 'roles',
            component: RolesComponent
          },
          {
            path: 'perfiles',
            component: PerfilesComponent
          }
        ]
      },
      {
        path: 'recomendacion',
        component: RecomendacionComponent,
        children: [
          {
            path: 'componente-1',
            component: RecomendacionComponent
          }
        ]
      }

    ]
  }
];


