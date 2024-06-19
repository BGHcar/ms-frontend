import { Component, OnInit } from '@angular/core';
import { Suscripcion } from 'src/app/models/funeraria/suscripcion.model';
import { SuscripcionService } from 'src/app/services/funeraria/suscripcion.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Titular } from 'src/app/models/funeraria/titular.model';
import { TitularService } from 'src/app/services/funeraria/titular.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  suscripciones: Suscripcion[];
  theSuscripcion: Suscripcion;
  theTitular: Titular;



  constructor(
    private service: SuscripcionService,
     private router: Router,
     private activateRoute: ActivatedRoute,
     private titularService: TitularService
    ) {
    this.suscripciones = [];
  }

  ngOnInit(): void {
    if (this.activateRoute.snapshot.queryParams.titular_id) {
      this.findTitular(this.activateRoute.snapshot.queryParams.titular_id);
    }
    else {
    this.list();
    }
  }

  list() {
    this.service.list().subscribe(data => {  
      this.suscripciones = data["data"]
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

  findTitular(id: number) {
    this.titularService.view(id).subscribe(data => {
      this.theTitular = data;
      this.theTitular.password = '';
      this.service.findSuscripcionByClienteId(this.theTitular.id).subscribe(data => {
        this.suscripciones = data["data"];
      });
    });
  }

}
