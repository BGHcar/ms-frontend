import { Component, OnInit } from '@angular/core';
import { Pago } from 'src/app/models/funeraria/pago.model';
import { PagoService } from 'src/app/services/funeraria/pago.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  pagos: Pago[];
  thePago: Pago;

  constructor(
    private service: PagoService,
    private router: Router
  ) {
    this.pagos = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      this.pagos = data["data"];
      console.log(JSON.stringify(this.pagos));
    });
  }

  view(id: number) {
    console.log("id: " + id);
    this.router.navigate(['pagos/view/' + id]);
  }

  update(id: number) {
    this.router.navigate(['pagos/update/' + id]);
  }

  create() {
    this.router.navigate(['pagos/create']);
  }


  delete(id: number) {
    Swal.fire({
      title: 'Eliminar Pago',
      text: "Está seguro que quiere eliminar el pago?",
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
            'El pago ha sido eliminado correctamente',
            'success'
          )
          this.list();
        });
      }
    });
  }

}
