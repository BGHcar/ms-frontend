import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Planxservicio } from 'src/app/models/funeraria/planxservicio.model';
import { PlanxservicioService } from 'src/app/services/funeraria/planxservicio.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  planesxServicio: Planxservicio[];
  thePlanesxServicio: Planxservicio;


  constructor(private service: PlanxservicioService, private router: Router) {
    this.planesxServicio = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      
      this.planesxServicio = data["data"]
    });
  }

  view(id: number) {
    console.log("id: " + id);
    this.router.navigate(['planesxservicios/view/' + id]);
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
            'La planxservicio ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    });
  }


  update(id: number) {
    this.router.navigate(['planesxservicios/update/' + id]);
  }

  create() {
    this.router.navigate(['planesxservicios/create']);
  }

}
