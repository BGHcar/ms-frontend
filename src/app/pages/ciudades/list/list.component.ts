import { Component, OnInit } from '@angular/core';
import { Ciudad } from 'src/app/models/funeraria/ciudad.model';
import { Departamento } from 'src/app/models/funeraria/departamento.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CiudadService } from 'src/app/services/funeraria/ciudad.service';
import { DepartamentoService } from 'src/app/services/funeraria/departamento.service';
import { tap } from 'rxjs/operators'; // Importa el operador tap

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  ciudades: Ciudad[];
  departamentos: Departamento[];

  constructor(private ciudadService: CiudadService, private departamentoService: DepartamentoService, private router: Router) {
    this.ciudades = [];
    this.departamentos = [];
  }

  ngOnInit(): void {
    this.listCiudades();
    this.listDepartamentos();
  }

  listCiudades() {
    this.ciudadService.list().subscribe(data => {
      this.ciudades = data["data"];
    });
  }

  listDepartamentos() {
    this.departamentoService.list().pipe(
      tap(data => {
        this.departamentos = data["data"];
      })
    ).subscribe();
  }

  obtenerNombreDepartamento(id: number): string {
    const departamento = this.departamentos.find(dep => dep.id === id);
    return departamento ? departamento.nombre : 'Desconocido';
  }

  view(id: number) {
    this.router.navigate(['ciudades/view/'+id]);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar Ciudad',
      text: "Está seguro que quiere eliminar la Ciudad?",
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
              'La Ciudad ha sido eliminada correctamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  };


  update(id: number) {
    this.router.navigate(['ciudades/update/'+id]);
  }

  create() {
    this.router.navigate(['ciudades/create']);
  }

}
