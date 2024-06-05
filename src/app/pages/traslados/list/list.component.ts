import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Traslado } from 'src/app/models/funeraria/traslado.model';
import { TrasladoService } from 'src/app/services/funeraria/traslado.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  traslado: Traslado[];
  theTraslado: Traslado;


  constructor(private service: TrasladoService, private router: Router) {
    this.traslado = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      
      this.traslado = data["data"]
      console.log(JSON.stringify(this.traslado));
    });
  }

  view(id: number) {
    console.log("id: " + id);
    this.router.navigate(['traslados/view/' + id]);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar el servicio de traslado',
      text: "Está seguro que quiere eliminar el servicio de traslado?",
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
    this.router.navigate(['traslados/update/' + id]);
  }

  create() {
    this.router.navigate(['traslados/create']);
  }

}
