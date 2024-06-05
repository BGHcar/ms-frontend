import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/funeraria/chat.model';
import { Ejecucionservicio } from 'src/app/models/funeraria/ejecucionservicio.model';
import { Cliente } from 'src/app/models/funeraria/cliente.model';
import { Servicio } from 'src/app/models/funeraria/servicio.model'; // Importamos el modelo de Servicio
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ChatService } from 'src/app/services/funeraria/chat.service';
import { EjecucionservicioService } from 'src/app/services/funeraria/ejecucionservicio.service';
import { ClienteService } from 'src/app/services/funeraria/cliente.service';
import { ServicioService } from 'src/app/services/funeraria/servicio.service'; // Importamos el servicio de Servicio
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  chats: Chat[] = [];
  ejecucionservicios: Ejecucionservicio[] = [];
  clientes: Cliente[] = [];
  servicios: Servicio[] = []; // Agregamos la lista de servicios
  chatsConDetalles: any[] = [];

  constructor(
    private chatService: ChatService,
    private ejecucionservicioService: EjecucionservicioService,
    private clienteService: ClienteService,
    private servicioService: ServicioService, // Inyectamos el servicio de Servicio
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    combineLatest([
      this.chatService.list(),
      this.ejecucionservicioService.list(),
      this.clienteService.list(),
      this.servicioService.list() // Hacemos una llamada para obtener la lista de servicios
    ]).subscribe(([chatsData, ejecucionServiciosData, clientesData, serviciosData]) => {
      this.chats = chatsData['data'];
      this.ejecucionservicios = ejecucionServiciosData['data'];
      this.clientes = clientesData['data'];
      this.servicios = serviciosData['data']; // Guardamos la lista de servicios

      this.chatsConDetalles = this.chats.map(chat => {
        const ejecucionServicio = this.ejecucionservicios.find(serv => serv.id === chat.eservicio_id);
        const cliente = ejecucionServicio ? this.clientes.find(cli => cli.id === ejecucionServicio.cliente_id) : null;
        const servicio = ejecucionServicio ? this.servicios.find(serv => serv.id === ejecucionServicio.servicio_id) : null; // Buscamos el servicio relacionado

        return {
          ...chat,
          nombre_cliente: cliente ? cliente.nombre : 'Desconocido',
          nombre_servicio: servicio ? servicio.nombre : 'Desconocido' // Utilizamos el nombre del servicio si está disponible
        };
      });
    });
  }

  obtenerNombreCliente(cliente_id: number): string {
    const cliente = this.clientes.find(cli => cli.id === cliente_id);
    return cliente ? cliente.nombre : 'Desconocido';
  }

  obtenerNombreServicio(servicio_id: number): string {
    const ejecucionservicio = this.ejecucionservicios.find(serv => serv.id === servicio_id);
    const servicio = ejecucionservicio ? this.servicios.find(serv => serv.id === ejecucionservicio.servicio_id) : null; // Buscamos el servicio relacionado
    return servicio ? servicio.nombre : 'Desconocido';
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
