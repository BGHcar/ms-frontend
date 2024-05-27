import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { SepulturaService } from 'src/app/services/funeraria/sepultura.service';
import { Sepultura } from 'src/app/models/funeraria/sepultura.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  sepultura: Sepultura[];
  theSepultura: Sepultura;


  constructor(private service: SepulturaService, private router: Router) {
    this.sepultura = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      
      this.sepultura = data["data"]
      console.log(JSON.stringify(this.sepultura));
    });
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
