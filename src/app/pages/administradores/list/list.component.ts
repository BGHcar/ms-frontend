import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/models/funeraria/administrador.model';
import { AdministradorService } from 'src/app/services/funeraria/administrador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  administradores: Administrador[];
  theAdministrador: Administrador;


  constructor(private service: AdministradorService, private router: Router) {
    this.administradores = [];
   }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      this.administradores = data["data"];
      console.log(JSON.stringify(this.administradores));
    });
  }

  view(id: number) {
    console.log("id: "+id);
    this.router.navigate(['administradores/view/'+id]);
  }

  update(id: number) {
    this.router.navigate(['administradores/update/'+id]);
  }

  create() {
    this.router.navigate(['administradores/create']);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar Administrador',
      text: "Está seguro que quiere eliminar el administrador?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'El administrador ha sido eliminada correctamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  }
}
