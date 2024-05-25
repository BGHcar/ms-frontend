import { Component, OnInit } from '@angular/core';
import { Sala } from 'src/app/models/funeraria/sala.model';
import { Sede } from 'src/app/models/funeraria/sede.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SalaService } from 'src/app/services/funeraria/sala.service';
import { SedeService } from 'src/app/services/funeraria/sede.service';
import { tap } from 'rxjs/operators'; // Importa el operador tap

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  salas: Sala[];
  sedes: Sede[];

  constructor(private salaService: SalaService, private sedeService: SedeService, private router: Router) {
    this.salas = [];
    this.sedes = [];
  }

  ngOnInit(): void {
    this.listSalas();
    this.listSedes();
  }

  listSalas() {
    this.salaService.list().subscribe(data => {
      this.salas = data["data"];
    });
  }

  listSedes() {
    this.sedeService.list().pipe(
      tap(data => {
        this.sedes = data["data"];
      })
    ).subscribe();
  }

  obtenerNombreSede(id: number): string {
    const sede = this.sedes.find(dep => dep.id === id);
    return sede ? sede.nombre : 'Desconocido';
  }

  view(id: number) {
    this.router.navigate(['salas/view/'+id]);
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
        this.salaService.delete(id).
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
    this.router.navigate(['salas/update/'+id]);
  }

  create() {
    this.router.navigate(['salas/create']);
  }

}
