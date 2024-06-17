import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RoleauthGuard } from 'src/app/guards/roleauth.guard';

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
        path : 'servicios',canActivate:[AuthGuard], 
        loadChildren : () => import('src/app/pages/servicios/servicios.module').then(m => m.ServiciosModule)
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
    },
    {
        path : 'salas', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/salas/salas.module').then(m => m.SalasModule)
    },
    {
        path : 'cremaciones', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/cremacion/cremacion.module').then(m => m.CremacionModule)
    },
    {
        path : 'chats', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/chats/chats.module').then(m => m.ChatsModule)
    },
    {
        path : 'mensajes', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/mensajes/mensajes.module').then(m => m.MensajesModule)
    },
    {
        path : 'sepulturas', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/sepulturas/sepulturas.module').then(m => m.SepulturasModule)
    },
    {
        path : 'ejecucion', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/ejecucion/ejecucion.module').then(m => m.EjecucionModule)
    },
    {
        path : 'traslados', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/traslados/traslados.module').then(m => m.TrasladosModule)
    },
    {
        path : 'planesxservicios', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/planxservicio/planxservicio.module').then(m => m.PlanxservicioModule)
    },
    {
        path : 'comentarios', canActivate:[AuthGuard],
        loadChildren : () => import('src/app/pages/comentarios/comentarios.module').then(m => m.ComentariosModule)
    }
];
