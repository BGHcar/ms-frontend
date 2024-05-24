import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile', canActivate:[AuthGuard],   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    {
        path : 'theaters', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/theaters/theaters.module').then(m => m.TheatersModule)
    },
    {
        path : 'movies', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/movies/movies.module').then(m => m.MoviesModule)
    },
    {
        path : 'projectors', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/projectors/projectors.module').then(m => m.ProjectorsModule)
    },
    {
        path : 'screenings', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/screenings/screenings.module').then(m => m.ScreeningsModule)
    },
    {
        path : 'seats', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/seats/seats.module').then(m => m.SeatsModule)
    },
    {
        path : 'login2',
        loadChildren : () => import('src/app/pages/login2/login2.module').then(m => m.Login2Module)
    },
    {
        path : 'administradores', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/administradores/administradores.module').then(m => m.AdministradoresModule)
    },
    {
        path : 'clientes', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/clientes/clientes.module').then(m => m.ClientesModule)
    },
    {
        path : 'conductores', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/conductores/conductores.module').then(m => m.ConductoresModule)
    },
    {
        path : 'titulares', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/titulares/titulares.module').then(m => m.TitularesModule)
    },
    {
        path : 'beneficiarios', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/beneficiarios/beneficiarios.module').then(m => m.BeneficiariosModule)
    },
    {
        path : 'planes', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/planes/planes.module').then(m => m.PlanesModule)
    },
    {
        path : 'suscripciones', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/suscripciones/suscripciones.module').then(m => m.SuscripcionesModule)
    },
    {
        path : 'pagos', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/pagos/pagos.module').then(m => m.PagosModule)
    },
    {
        path : 'departamentos', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/departamentos/departamentos.module').then(m => m.DepartamentosModule)
    },
    {
        path : 'ciudades', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/ciudades/ciudades.module').then(m => m.CiudadesModule)
    },
    {
        path : 'sedes', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/sedes/sedes.module').then(m => m.SedesModule)
    }
];
