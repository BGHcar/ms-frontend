import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Traslado } from 'src/app/models/funeraria/traslado.model';
import { TrasladoService } from 'src/app/services/funeraria/traslado.service';
import { Ciudad } from 'src/app/models/funeraria/ciudad.model';
import { CiudadService } from 'src/app/services/funeraria/ciudad.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  traslado: Traslado[];
  theTraslado: Traslado;
  ciudades: Ciudad[];

  constructor(private ciudadService: CiudadService, private service: TrasladoService, private router: Router, private activateRoute: ActivatedRoute) {
    this.traslado = [];
    this.ciudades = [];

  }

  ngOnInit(): void {
    if (this.activateRoute.snapshot.queryParams.servicio_id) {
    this.listbyServicio(this.activateRoute.snapshot.queryParams.servicio_id);
    this.listCiudades();
    }
    else {
      this.list();
      this.listCiudades();
    }
  }
  
  list() {
    this.service.list().subscribe(data => {
      
      this.traslado = data["data"]
      console.log(JSON.stringify(this.traslado));
    });
  }
  listCiudades() {
    this.ciudadService.list().subscribe(data => {
      this.ciudades = data["data"];
    });
  }
  listbyServicio(id: number) {
    this.service.listbyServicio(id).subscribe(data => {
      this.traslado = data["data"];
    });
  }
  obtenerNombreCiudad(id: number): string {
    const ciudad = this.ciudades.find(dep => dep.id === id);
    return ciudad ? ciudad.nombre : 'Desconocido';
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
