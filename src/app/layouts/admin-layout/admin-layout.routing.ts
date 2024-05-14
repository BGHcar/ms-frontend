import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    {
        path : 'theaters',
        loadChildren : () => import('src/app/pages/theaters/theaters.module').then(m => m.TheatersModule)
    },
    {
        path : 'movies',
        loadChildren : () => import('src/app/pages/movies/movies.module').then(m => m.MoviesModule)
    },
    {
        path : 'projectors',
        loadChildren : () => import('src/app/pages/projectors/projectors.module').then(m => m.ProjectorsModule)
    },
    {
        path : 'screenings',
        loadChildren : () => import('src/app/pages/screenings/screenings.module').then(m => m.ScreeningsModule)
    },
    {
        path : 'seats',
        loadChildren : () => import('src/app/pages/seats/seats.module').then(m => m.SeatsModule)
    },
    {
        path : 'login2',
        loadChildren : () => import('src/app/pages/login2/login2.module').then(m => m.Login2Module)
    },
    {
        path : 'administradores',
        loadChildren : () => import('src/app/pages/administradores/administradores.module').then(m => m.AdministradoresModule)
    },
    {
        path : 'clientes',
        loadChildren : () => import('src/app/pages/clientes/clientes.module').then(m => m.ClientesModule)
    },
    {
        path : 'conductores',
        loadChildren : () => import('src/app/pages/conductores/conductores.module').then(m => m.ConductoresModule)
    },
    {
        path : 'titulares',
        loadChildren : () => import('src/app/pages/titulares/titulares.module').then(m => m.TitularesModule)
    },
    {
        path : 'beneficiarios',
        loadChildren : () => import('src/app/pages/beneficiarios/beneficiarios.module').then(m => m.BeneficiariosModule)
    }
];
