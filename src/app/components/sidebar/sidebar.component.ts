import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/theaters/list', title: 'Theaters',  icon:'ni-tv-2 text-info', class: '' },
    { path: '/movies/list', title: 'Movies',  icon:'ni-collection text-red', class: '' },
    { path: '/projectors/list', title: 'Projectors',  icon:'ni-camera-compact text-yellow', class: '' },
    { path: '/screenings/list', title: 'Screenings',  icon:'ni-tablet-button text-orange', class: '' },
    { path: '/seats/list', title: 'Seats',  icon:'ni-bullet-list-67 text-blue', class: '' },
    { path: '/login2/manage', title: 'Login2',  icon:'ni-key-25 text-info', class: '' },
    { path: '/administradores/list', title: 'Administradores',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/clientes/list', title: 'Clientes',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/conductores/list', title: 'Conductores',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/titulares/list', title: 'Titulares',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/beneficiarios/list', title: 'Beneficiarios',  icon:'ni-single-02 text-yellow', class: ''}
];

// que otros iconos pueden ser usados para un teatro, pelicula, proyector, proyeccion y asiento? 
// https://demos.creative-tim.com/argon-dashboard-angular/icons
// https://demos.creative-tim.com/argon-dashboard-angular/docs/plugins/nucleo/icons

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
