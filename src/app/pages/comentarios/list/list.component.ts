import { Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/models/funeraria/comentario.model';
import { Ejecucionservicio } from 'src/app/models/funeraria/ejecucionservicio.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ComentarioService } from 'src/app/services/funeraria/comentario.service';
import { EjecucionservicioService } from 'src/app/services/funeraria/ejecucionservicio.service';
import { Servicio } from 'src/app/models/funeraria/servicio.model';
import { ServicioService } from 'src/app/services/funeraria/servicio.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  comentarios: Comentario[] = [];
  ejecucionservicios: Ejecucionservicio[] = [];
  comentariosConDetalles: any[] = [];
  servicios:Servicio[]=[]


  constructor(
    private comentarioService: ComentarioService,
    private ejecucionservicioService: EjecucionservicioService,
    private router: Router,
    private servicioServices:ServicioService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    combineLatest([
      this.comentarioService.list(),
      this.ejecucionservicioService.list(),
      this.servicioServices.list() // Hacemos una llamada para obtener la lista de servicios
    ]).subscribe(([comentariosData, ejecucionServiciosData, serviciosData]) => {
      this.comentarios = comentariosData['data'];
      this.ejecucionservicios = ejecucionServiciosData['data'];
      this.servicios = serviciosData['data']; // Guardamos la lista de servicios

      this.comentariosConDetalles = this.comentarios.map(chat => {
        const ejecucionServicio = this.ejecucionservicios.find(serv => serv.id === chat.eservicio_id);
        const servicio = ejecucionServicio ? this.servicios.find(serv => serv.id === ejecucionServicio.servicio_id) : null; // Buscamos el servicio relacionado

        return {
          ...chat,
          nombre_servicio: servicio ? servicio.nombre : 'Desconocido' // Utilizamos el nombre del servicio si está disponible
        };
      });
    });
  }
  
  obtenerNombreServicio(servicio_id: number): string {
    const ejecucionservicio = this.ejecucionservicios.find(serv => serv.id === servicio_id);
    const servicio = ejecucionservicio ? this.servicios.find(serv => serv.id === ejecucionservicio.servicio_id) : null; // Buscamos el servicio relacionado
    return servicio ? servicio.nombre : 'Desconocido';
  }
  
  view(id: number) {
    this.router.navigate(['comentarios/view/' + id]);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar Comentario',
      text: "Está seguro que quiere eliminar este Comentario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.comentarioService.delete(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El Comentario ha sido eliminada correctamente',
            'success'
          );
          this.loadData();
        });
      }
    });
  }

  update(id: number) {
    this.router.navigate(['comentarios/update/' + id]);
  }

  create() {
    this.router.navigate(['comentarios/create']);
  }

  getStars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }


}
