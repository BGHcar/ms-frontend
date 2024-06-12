import { Component, OnInit } from '@angular/core';
import { Titular } from 'src/app/models/funeraria/titular.model';
import { TitularService } from 'src/app/services/funeraria/titular.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  titulares: Titular[];
  theTitular: Titular;

  constructor(
    private service: TitularService,
    private router: Router
  ) {
    this.titulares = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      this.titulares = data["data"];
    });
  }

  view(id: number) {
    this.router.navigate(['titulares/view/'+id]);
  }

  update(id: number) {
    this.router.navigate(['titulares/update/'+id]);
  }

  create() {
    this.router.navigate(['titulares/create']);
  }


  delete(id: number) {
    Swal.fire({
      title: 'Eliminar Titular',
      text: "Está seguro que quiere eliminar el titular?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'El titular ha sido eliminado.',
              'success'
            );
            this.list();
          });
      }
    });
  }

}
