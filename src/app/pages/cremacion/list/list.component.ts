import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Cremacion } from 'src/app/models/funeraria/cremacion.model';
import { CremacionService } from 'src/app/services/funeraria/cremacion.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  cremacion: Cremacion[];
  theCremacion: Cremacion;


  constructor(private service: CremacionService, private router: Router) {
    this.cremacion = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      
      this.cremacion = data["data"]
      console.log(JSON.stringify(this.cremacion));
    });
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
