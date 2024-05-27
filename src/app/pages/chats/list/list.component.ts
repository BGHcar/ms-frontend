import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/funeraria/chat.model';
import { Ejecucionservicio } from 'src/app/models/funeraria/ejecucionservicio.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ChatService } from 'src/app/services/funeraria/chat.service';
import { EjecucionservicioService } from 'src/app/services/funeraria/ejecucionservicio.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  chats: Chat[] = [];
  ejecucionservicios: Ejecucionservicio[] = [];
  chatsConDetalles: any[] = [];

  constructor(
    private chatService: ChatService,
    private ejecucionservicioService: EjecucionservicioService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    combineLatest([
      this.chatService.list(),
      this.ejecucionservicioService.list()
    ]).subscribe(([chatsData, ejecucionServiciosData]) => {

  
      this.chats = chatsData['data'];
      this.ejecucionservicios = ejecucionServiciosData['data'];
  
      this.chatsConDetalles = this.chats.map(chat => {
        const ejecucionServicio = this.ejecucionservicios.find(serv => serv.id === chat.eservicio_id);
        return {
          ...chat,
          nombre_cliente: ejecucionServicio ? ejecucionServicio.cliente.nombre : 'Desconocido',
          nombre_servicio: ejecucionServicio ? ejecucionServicio.servicio.nombre : 'Desconocido'
        };
      });
    });
  }
  

  obtenerNombreCliente(id: number): string {
    const ejecucionservicio = this.ejecucionservicios.find(serv => serv.id === id);
    return ejecucionservicio ? ejecucionservicio.cliente.nombre : 'Desconocido';
  }

  obtenerNombreServicio(id: number): string {
    const ejecucionservicio = this.ejecucionservicios.find(serv => serv.id === id);
    return ejecucionservicio ? ejecucionservicio.servicio.nombre : 'Desconocido';
  }
  
  view(id: number) {
    this.router.navigate(['chats/view/' + id]);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar Chat',
      text: "Está seguro que quiere eliminar este Chat?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.chatService.delete(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El chat ha sido eliminada correctamente',
            'success'
          );
          this.loadData();
        });
      }
    });
  }

  update(id: number) {
    this.router.navigate(['chats/update/' + id]);
  }

  create() {
    this.router.navigate(['chats/create']);
  }

  mensajes() {
    this.router.navigate(['mensajes/list']);
  }
}
