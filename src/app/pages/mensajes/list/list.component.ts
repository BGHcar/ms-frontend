import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/models/funeraria/mensaje.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MensajeService } from 'src/app/services/funeraria/mensaje.service';
import { WebSocketService } from 'src/app/services/funeraria/web-socket.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  mensajes: Mensaje[];
  theFormGroup: FormGroup;
  chatId: number;
  userId: string;
  user_name: string;

  constructor(
    private mensajeService: MensajeService,
    private router: Router,
    private route: ActivatedRoute,
    private theFormBuilder: FormBuilder,
    private webSocketService: WebSocketService
  ) {
    this.mensajes = [];
  }

  ngOnInit(): void {
    const userData = this.getUserIdAndNameFromLocalStorage();
    this.userId = userData.userId;
    this.user_name = userData.user_name;
    console.log('User ID obtenido del local storage:', this.userId);
    console.log('User Name obtenido del local storage:', this.user_name);
    this.route.params.subscribe(params => {
      this.chatId = +params['id']; // Obtener el ID de la URL
      this.configFormGroup();
      this.listMensajes();
      this.webSocketService.setNameEvent('nombre_evento_websocket');
      this.webSocketService.callback.subscribe((data: any) => {
        console.log('Datos del WebSocket:', data);
      });
    });
  }

  getUserIdAndNameFromLocalStorage(): { userId: string, user_name: string } {
    const sessionData = JSON.parse(localStorage.getItem('sesion')) || {};
    return { userId: sessionData._id || '', user_name: sessionData.name || '' };
  }

  listMensajes() {
    this.mensajeService.read(this.chatId).subscribe((response: any) => {
      if ('data' in response) {
        this.mensajes = response.data.map((mensaje: Mensaje) => ({
          ...mensaje,
          user_name: mensaje.user_id === this.userId ? this.user_name : mensaje.user_name // Utilizar el nombre de usuario actual
        }));
      } else {
        this.mensajes = response.map((mensaje: Mensaje) => ({
          ...mensaje,
          user_name: mensaje.user_id === this.userId ? this.user_name : mensaje.user_name // Utilizar el nombre de usuario actual
        }));
      }
      console.log(this.mensajes);
    });
  }
  
  
  

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      contenido: [''],
    });
  }

  view(id: number) {
    this.router.navigate(['mensajes/view/' + id]);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar Mensaje',
      text: '¿Está seguro que quiere eliminar el mensaje?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.mensajeService.delete(id).subscribe(data => {
          this.listMensajes();
        });
      }
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene los campos correctamente", "error");
    } else {
      const nuevoMensaje: Mensaje = {
        user_id: this.userId,
        contenido: this.theFormGroup.get('contenido').value,
        chat_id: this.chatId 
      };
  
      this.mensajeService.create(nuevoMensaje).subscribe(data => {
        this.listMensajes();
        setTimeout(() => {
          this.scrollToBottom();
        }, 10); // Esperar 100 milisegundos antes de desplazar hacia abajo
        this.theFormGroup.reset();
      });
    }
  }  
  
  scrollToBottom() {
    setTimeout(() => {
      const messageBox = document.getElementById('message-box');
      if (messageBox) {
        messageBox.scrollTop = messageBox.scrollHeight;
      }
    });
  }

  edit(mensaje: Mensaje) {
    const now = new Date();
    const tenMinutesAgo = new Date(now.getTime() - 10 * 60000); // 10 minutos atrás en milisegundos
  
    if (new Date(mensaje.created_at) < tenMinutesAgo) {
      Swal.fire('Error', 'Ya no puedes editar este mensaje porque han pasado más de 10 minutos.', 'error');
      return;
    }
  
    Swal.fire({
      title: 'Editar Mensaje',
      input: 'textarea',
      inputValue: mensaje.contenido,
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (contenido) => {
        // Llamar al servicio para actualizar el mensaje con el nuevo contenido
        return this.mensajeService.update({...mensaje, contenido}).toPromise();
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        // Si la edición es exitosa, actualizar la lista de mensajes
        this.listMensajes();
        Swal.fire('¡Mensaje editado!', '', 'success');
      }
    });
  }
  
  



}
