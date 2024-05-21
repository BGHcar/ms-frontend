import { Component, OnInit } from '@angular/core';
import { Suscripcion } from 'src/app/models/funeraria/suscripcion.model';
import { SuscripcionService } from 'src/app/services/funeraria/suscripcion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  suscripciones: Suscripcion[];
  theSuscripcion: Suscripcion;


  constructor(private service: SuscripcionService, private router: Router) {
    this.suscripciones = [];
  }

  ngOnInit(): void {
  }

  list() {
    this.service.list().subscribe(data => {
      this.suscripciones = data["data"];
      console.log(JSON.stringify(this.suscripciones));
    });
  }

  view(id: number) {
    console.log("id: " + id);
    this.router.navigate(['suscripciones/view/' + id]);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar Suscripción',
      text: "Está seguro que quiere eliminar la suscripción?",
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
            'La suscripción ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    });
  }


  update(id: number) {
    this.router.navigate(['suscripciones/update/' + id]);
  }

  create() {
    this.router.navigate(['suscripciones/create']);
  }

}
