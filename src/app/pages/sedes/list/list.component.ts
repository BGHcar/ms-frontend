import { Component, OnInit } from '@angular/core';
import { Ciudad } from 'src/app/models/funeraria/ciudad.model';
import { Sede } from 'src/app/models/funeraria/sede.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CiudadService } from 'src/app/services/funeraria/ciudad.service';
import { SedeService } from 'src/app/services/funeraria/sede.service';
import { tap } from 'rxjs/operators'; // Importa el operador tap

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  ciudades: Ciudad[];
  sedes: Sede[];

  constructor(private ciudadService: CiudadService, private sedeService: SedeService, private router: Router) {
    this.ciudades = [];
    this.sedes = [];
  }

  ngOnInit(): void {
    this.listCiudades();
    this.listSedes();
  }

  listCiudades() {
    this.ciudadService.list().subscribe(data => {
      this.ciudades = data["data"];
    });
  }

  listSedes () {
    this.sedeService.list().pipe(
      tap(data => {
        this.sedes = data["data"];
      })
    ).subscribe();
  }

  obtenerNombreCiudad(id: number): string {
    const ciudad = this.ciudades.find(dep => dep.id === id);
    return ciudad ? ciudad.nombre : 'Desconocido';
  }

  view(id: number) {
    this.router.navigate(['sedes/view/'+id]);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar Sede',
      text: "Está seguro que quiere eliminar la Sede?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ciudadService.delete(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'La Sede ha sido eliminada correctamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  };


  update(id: number) {
    this.router.navigate(['sedes/update/'+id]);
  }

  create() {
    this.router.navigate(['sedes/create']);
  }

}
