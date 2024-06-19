import { Component, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'argon-dashboard-angular';

  private sessionTimeout: number = 5 * 60 * 1000; // 5 minutos en milisegundos
  private timeoutId: ReturnType<typeof setTimeout> | undefined;
  private lastInteraction: number = Date.now();

  constructor() {
    this.resetTimeout();
  }

  @HostListener('window:mousemove')
  @HostListener('window:click')
  @HostListener('window:keypress')
  resetTimeout() {
    // Reiniciar el temporizador
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.lastInteraction = Date.now(); // Actualizar el tiempo de la última interacción
    this.timeoutId = setTimeout(() => {
      const elapsedTime = Date.now() - this.lastInteraction;
      if (elapsedTime >= this.sessionTimeout) {
        localStorage.clear(); // Limpiar localStorage después de 5 minutos de inactividad
      }
    }, this.sessionTimeout);
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: Event) {
    // Cancelar el temporizador al cerrar la pestaña o recargar
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    const elapsedTime = Date.now() - this.lastInteraction;
    if (elapsedTime >= this.sessionTimeout) {
      localStorage.clear(); // Limpiar localStorage solo si se ha superado el tiempo de sesión
    }
  }

  ngOnDestroy() {
    // Limpiar el temporizador al destruir el componente para evitar fugas de memoria
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
