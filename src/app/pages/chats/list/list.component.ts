import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/funeraria/chat.model';
import { Ejecucionservicio } from 'src/app/models/funeraria/ejecucionservicio.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ChatService } from 'src/app/services/funeraria/chat.service';
import { EjecucionservicioService } from 'src/app/services/funeraria/ejecucionservicio.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  chats: Chat[];
  ejecucionservicios: Ejecucionservicio[];

  constructor(private chatService: ChatService, private ejecucionservicioService: EjecucionservicioService, private router: Router) {
    this.chats = [];
    this.ejecucionservicios = [];
  }

  ngOnInit(): void {
    this.listChats();
    this.listEjecucionSer();
  }

  listChats() {
    this.chatService.list().subscribe(data => {
      this.chats = data["data"];
    });
  }

  listEjecucionSer() {
    this.ejecucionservicioService.list().pipe(
      tap(data => {
        this.ejecucionservicios = data["data"].filter((item: any) =>
          this.chats.some(chat => chat.eservicio_id === item.id)
        ).map((item: any) => ({
          ...item,
          nombre_cliente: item.cliente ? item.cliente.nombre : 'Desconocido',
          nombre_servicio: item.servicio ? item.servicio.nombre : 'Desconocido'
        }));
      })
    ).subscribe();
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
      title: 'Eliminar Ciudad',
      text: "Está seguro que quiere eliminar la Ciudad?",
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
            'La Ciudad ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  };


  update(id: number) {
    this.router.navigate(['chats/update/' + id]);
  }

  create() {
    this.router.navigate(['chats/create']);
  }

}
