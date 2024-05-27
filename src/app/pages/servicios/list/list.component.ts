import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Servicio } from 'src/app/models/funeraria/servicio.model';
import { ServicioService } from 'src/app/services/funeraria/servicio.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  servicios: Servicio[];
  theServicio: Servicio;


  constructor(private service: ServicioService, private router: Router) {
    this.servicios = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      
      this.servicios = data["data"]
      console.log(JSON.stringify(this.servicios));
    });
  }

  view(id: number) {
    console.log("id: " + id);
    this.router.navigate(['servicios/view/' + id]);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar servicio',
      text: "Está seguro que quiere eliminar el servicio?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El servicio ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    });
  }


  update(id: number) {
    this.router.navigate(['servicios/update/' + id]);
  }

  create() {
    this.router.navigate(['servicios/create']);
  }

}
