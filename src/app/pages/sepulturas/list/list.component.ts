import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { SepulturaService } from 'src/app/services/funeraria/sepultura.service';
import { Sepultura } from 'src/app/models/funeraria/sepultura.model';
import { Sala } from 'src/app/models/funeraria/sala.model';
import { SalaService } from 'src/app/services/funeraria/sala.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  sepultura: Sepultura[];
  theSepultura: Sepultura;
  salas:Sala[]

  constructor(private service: SepulturaService, private router: Router, private salaServices: SalaService) {
    this.sepultura = [];
    this.salas = [];

  }

  ngOnInit(): void {
    this.list();
    this.listSalas();
  }
  listSalas() {
    this.salaServices.list().subscribe(data => {
      this.salas = data["data"];
    });
  }

  list() {
    this.service.list().subscribe(data => {
      
      this.sepultura = data["data"]
      console.log(JSON.stringify(this.sepultura));
    });
  }
  obtenerSala(id: number): string {
    const sala = this.salas.find(dep => dep.id === id);
    return sala ? sala.nombre : 'Desconocido';
  }

  view(id: number) {
    console.log("id: " + id);
    this.router.navigate(['sepulturas/view/' + id]);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar el servicio de sepultura',
      text: "Está seguro que quiere eliminar el servicio de sepultura?",
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
    this.router.navigate(['sepulturas/update/' + id]);
  }

  create() {
    this.router.navigate(['sepulturas/create']);
  }

}
