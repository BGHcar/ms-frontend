import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleauthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    // Obtener los datos del usuario del localStorage
    const user = JSON.parse(localStorage.getItem('sesion'));
    const roleName = user && user.role && user.role.name; // Obtener el nombre del rol del usuario

    console.log(roleName); // Mostrar el nombre del rol en la consola (puedes remover esto después de verificar)

    // Verificar si el usuario está autenticado y tiene el rol adecuado
    if (user && user.isAuthenticated && roleName && roleName !== 'Cliente') {
      return true; // El usuario tiene el rol adecuado
    } else {
      // Mostrar un mensaje de error y redirigir al usuario si no está autenticado o no tiene el rol adecuado
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'No tienes permiso para acceder',
        allowOutsideClick: false // Evita que se cierre el mensaje al hacer clic fuera
      });
      return false;
    }
  }
}
