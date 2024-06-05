import { Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/models/funeraria/comentario.model';
import { Ejecucionservicio } from 'src/app/models/funeraria/ejecucionservicio.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ComentarioService } from 'src/app/services/funeraria/comentario.service';
import { EjecucionservicioService } from 'src/app/services/funeraria/ejecucionservicio.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  comentarios: Comentario[] = [];
  ejecucionservicios: Ejecucionservicio[] = [];
  comentariosConDetalles: any[] = [];


  constructor(
    private comentarioService: ComentarioService,
    private ejecucionservicioService: EjecucionservicioService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    // Lógica para cargar los chats y los detalles de ejecución del servicio
    this.comentarioService.list().subscribe((comentariosData: any) => {
      this.comentarios = comentariosData['data'];
    });
    
    this.ejecucionservicioService.list().subscribe((ejecucionServiciosData: any) => {
      this.ejecucionservicios = ejecucionServiciosData['data'];
  
      this.comentariosConDetalles = this.comentarios.map(comentario => {
        const ejecucionServicio = this.ejecucionservicios.find(serv => serv.id === comentario.eservicio_id);
        return {
          ...comentario,
          nombre_servicio: ejecucionServicio ? ejecucionServicio.servicio.nombre : 'Desconocido'
        };
      });
    });
  }
  
  obtenerNombreServicio(id: number): string {
    const ejecucionservicio = this.ejecucionservicios.find(serv => serv.id === id);
    return ejecucionservicio ? ejecucionservicio.servicio.nombre : 'Desconocido';
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


}
