import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Cremacion } from 'src/app/models/funeraria/cremacion.model';
import { CremacionService } from 'src/app/services/funeraria/cremacion.service';
import { Sala } from 'src/app/models/funeraria/sala.model';
import { SalaService } from 'src/app/services/funeraria/sala.service';
import { CiudadService } from 'src/app/services/funeraria/ciudad.service';
import { Ciudad } from 'src/app/models/funeraria/ciudad.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  cremacion: Cremacion[];
  theCremacion: Cremacion;
  salas:Sala[]
  ciudades: Ciudad[];

  constructor(private activateRoute: ActivatedRoute, private service: CremacionService, private router: Router, private salaServices: SalaService, private ciudadService: CiudadService) {
    this.cremacion = [];
    this.salas = [];
    this.ciudades = [];

  }

  ngOnInit(): void {
    if (this.activateRoute.snapshot.queryParams.servicio_id) {
    this.listbyServicio(this.activateRoute.snapshot.queryParams.servicio_id);
    this.listSalas();
    this.listCiudades();
    }
    else {
      this.list();
      this.listSalas();
      this.listCiudades();
    }
  }
  listSalas() {
    this.salaServices.list().subscribe(data => {
      this.salas = data["data"];
    });
  }

  list() {
    this.service.list().subscribe(data => {
      
      this.cremacion = data["data"]
      console.log(JSON.stringify(this.cremacion));
    });
  }
  listCiudades() {
    this.ciudadService.list().subscribe(data => {
      this.ciudades = data["data"];
    });
  }
  listbyServicio(id: number) {
    this.service.listbyServicio(id).subscribe(data => {
      this.cremacion = data["data"];
    });
  }
  obtenerSala(id: number): string {
    const sala = this.salas.find(dep => dep.id === id);
    return sala ? sala.nombre : 'Desconocido';
  }
  obtenerNombreCiudad(id: number): string {
    const ciudad = this.ciudades.find(dep => dep.id === id);
    return ciudad ? ciudad.nombre : 'Desconocido';
  }
  view(id: number) {
    console.log("id: " + id);
    this.router.navigate(['cremaciones/view/' + id]);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar cremacion',
      text: "Está seguro que quiere eliminar el servicio de cremacion?",
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
            'El servicio de cremacion ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    });
  }


  update(id: number) {
    this.router.navigate(['cremaciones/update/' + id]);
  }

  create() {
    this.router.navigate(['cremaciones/create']);
  }

}
