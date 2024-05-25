import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/funeraria/user.model';
import { SecurityService } from 'src/app/services/funeraria/security.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  type: number;  // 0: No logeado, 1: Logeado 2: Ambos
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '', type: 0 },
  { path: '/icons', title: 'Icons', icon: 'ni-planet text-blue', class: '' , type: 0},
  { path: '/maps', title: 'Maps', icon: 'ni-pin-3 text-orange', class: '' , type: 0},
  { path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-yellow', class: '' , type: 1},
  { path: '/tables', title: 'Tables', icon: 'ni-bullet-list-67 text-red', class: '' , type: 1},
  { path: '/login', title: 'Login', icon: 'ni-key-25 text-info', class: '' , type: 0},
  { path: '/register', title: 'Register', icon: 'ni-circle-08 text-pink', class: '' , type: 0},
  { path: '/theaters/list', title: 'Theaters', icon: 'ni-tv-2 text-info', class: '' , type: 1},
  { path: '/movies/list', title: 'Movies', icon: 'ni-collection text-red', class: '' , type: 1},
  { path: '/projectors/list', title: 'Projectors', icon: 'ni-camera-compact text-yellow', class: '' , type: 1},
  { path: '/screenings/list', title: 'Screenings', icon: 'ni-tablet-button text-orange', class: '' , type: 1},
  { path: '/seats/list', title: 'Seats', icon: 'ni-bullet-list-67 text-blue', class: '' , type: 1},
  { path: '/login2/manage', title: 'Login2', icon: 'ni-key-25 text-info', class: '' , type: 1},
  { path: '/administradores/list', title: 'Administradores', icon: 'ni-circle-08 text-pink', class: '' , type: 1},
  { path: '/clientes/list', title: 'Clientes', icon: 'ni-single-02 text-yellow', class: '' , type: 1},
  { path: '/conductores/list', title: 'Conductores', icon: 'ni-single-02 text-yellow', class: '' , type: 1},
  { path: '/titulares/list', title: 'Titulares', icon: 'ni-single-02 text-yellow', class: '' , type: 1},
  { path: '/beneficiarios/list', title: 'Beneficiarios', icon: 'ni-single-02 text-yellow', class: '' , type: 1},
  { path: '/departamentos/list', title: 'Departamentos', icon: 'ni-square-pin text-green', class: '' , type: 1},
  { path: '/ciudades/list', title: 'Ciudades', icon: 'ni-building text-yellow', class: '' , type: 1},
  { path: '/sedes/list', title: 'Sedes', icon: 'ni-istanbul text-blue', class: '' , type: 1},
  { path: '/salas/list', title: 'Salas', icon: 'ni-shop text-red', class: '' , type: 1},
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

  theUser: User;
  subscription: Subscription;
  public menuItems: any[];
  public isCollapsed = true;


  constructor(private router: Router, private theSecurityService:SecurityService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    this.subscription = this.theSecurityService.getUser().subscribe(data => {
      this.theUser = data;
    });
  }
}
