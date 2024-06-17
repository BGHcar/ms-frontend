import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/funeraria/user.model';
import { SecurityService } from 'src/app/services/funeraria/security.service';
import { WebSocketService } from 'src/app/services/funeraria/web-socket.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  type: string;  // 0: No logeado, 1: Logeado 2: Admin 3: Cliente 4: Conductor 5: Titular
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '', type: "No logeado" },
  { path: '/icons', title: 'Icons', icon: 'ni-planet text-blue', class: '', type: "No logeado" },
  { path: '/maps', title: 'Maps', icon: 'ni-pin-3 text-orange', class: '', type: "No logeado" },
  { path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-yellow', class: '', type: "Cliente" },
  { path: '/tables', title: 'Tables', icon: 'ni-bullet-list-67 text-red', class: '', type: "Administrador" },
  { path: '/login', title: 'Login', icon: 'ni-key-25 text-info', class: '', type: "No logeado" },
  { path: '/register', title: 'Register', icon: 'ni-circle-08 text-pink', class: '', type: "No logeado" },
  { path: '/administradores/list', title: 'Administradores', icon: 'ni-circle-08 text-pink', class: '', type: "Administrador" },
  { path: '/conductores/list', title: 'Conductores', icon: 'ni-single-02 text-yellow', class: '', type: "Administrador" },
  { path: '/titulares/list', title: 'Titulares', icon: 'ni-single-02 text-yellow', class: '', type: "Administrador" },
  { path: '/servicios/list', title: 'Servicios', icon: 'ni-folder-17 text-blue', class: '', type: "Administrador" },
  { path: '/cremaciones/list', title: 'Cremacion', icon: 'ni-folder-17 text-red', class: '', type: "Administrador" },
  { path: '/sepulturas/list', title: 'Sepultura', icon: 'ni-folder-17 text-red', class: '', type: "Administrador" },
  { path: '/traslados/list', title: 'Traslados', icon: 'ni-send text-red', class: '', type: "Administrador" },
  { path: '/planes/list', title: 'Planes', icon: 'ni-send text-red', class: '', type: "Administrador" },
  { path: '/planesxservicios/list', title: 'planes x servicios', icon: 'ni-send text-red', class: '', type: "Administrador" },
  { path: '/ejecucion/list', title: 'Ejecucion', icon: 'ni-folder-17 text-red', class: '', type: "Administrador" },
  { path: '/departamentos/list', title: 'Departamentos', icon: 'ni-square-pin text-green', class: '', type: "Administrador" },
  { path: '/ciudades/list', title: 'Ciudades', icon: 'ni-building text-yellow', class: '', type: "Administrador" },
  { path: '/sedes/list', title: 'Sedes', icon: 'ni-istanbul text-blue', class: '', type: "Administrador" },
  { path: '/salas/list', title: 'Salas', icon: 'ni-shop text-red', class: '', type: "Administrador" },
  { path: '/chats/list', title: 'Chats', icon: 'ni-email-83 text-red', class: '', type: "Administrador" },
  { path: '/comentarios/list', title: 'Comentarios', icon: 'ni-email-83 text-red', class: '', type: "Ambos" },
  { path: '/pay-button/list', title: 'Pay Button', icon: 'ni-email-83 text-red', class: '', type: "Ambos" },

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
  session = JSON.parse(localStorage.getItem('sesion'));
  public rolename :string;


  constructor(private router: Router, private theSecurityService: SecurityService, private theWebSocketServices: WebSocketService) { 
    this.rolename = "No logeado"
  }

  ngOnInit() {
    if (this.session) {
      this.rolename = this.session.role.name;
    }
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    this.subscription = this.theSecurityService.getUser().subscribe(data => {
      this.theUser = data;
    });
    this.theWebSocketServices.setNameEvent("notifications")
    this.theWebSocketServices.callback.subscribe(data => {
      console.log("llegando notificacion desde el backend" + JSON.stringify(data))
    })
    console.log("rolename: " + this.rolename)
  }
}
