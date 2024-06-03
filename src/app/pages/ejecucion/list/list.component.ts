import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Ejecucionservicio } from 'src/app/models/funeraria/ejecucionservicio.model';
import { EjecucionservicioService } from 'src/app/services/funeraria/ejecucionservicio.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  ejecucion: Ejecucionservicio[];
  theEjecution: Ejecucionservicio;


  constructor(private service: EjecucionservicioService, private router: Router) {
    this.ejecucion = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      
      this.ejecucion = data["data"]
      console.log(JSON.stringify(this.ejecucion));
    });
  }

  view(id: number) {
    console.log("id: " + id);
    this.router.navigate(['ejecucion/view/' + id]);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar la ejecucion del servicio',
      text: "Está seguro que quiere eliminar la ejecucion?",
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
            'la ejecucion ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    });
  }


  update(id: number) {
    this.router.navigate(['ejecucion/update/' + id]);
  }

  create() {
    this.router.navigate(['ejecucion/create']);
  }


}
