import { Component, OnInit } from '@angular/core';
import { Beneficiario } from 'src/app/models/funeraria/beneficiario.model';
import { BeneficiarioService } from 'src/app/services/funeraria/beneficiario.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  beneficiarios: Beneficiario[];
  theBeneficiario: Beneficiario;
  constructor(
    private activateRoute: ActivatedRoute,
    private service: BeneficiarioService,
    private router: Router
  ) {
    this.beneficiarios = [];
  }

  ngOnInit(): void {
    if (this.activateRoute.snapshot.queryParams.titular_id) {
    this.listByTitular(this.activateRoute.snapshot.queryParams.titular_id);
    }
    else {
      this.list();
    }
  }

  list() {
    this.service.list().subscribe(data => {
      this.beneficiarios = data["data"];
    });
  }

  listByTitular(id: number) {
    this.service.listByTitular(id).subscribe(data => {
      this.beneficiarios = data["data"];
    });
  }

  view(id: number) {
    this.router.navigate(['beneficiarios/view/' + id]);
  }

  update(id: number) {
    this.router.navigate(['beneficiarios/update/' + id]);
  }

  create() {
    this.router.navigate(['beneficiarios/create']);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar Beneficiario',
      text: "Está seguro que quiere eliminar el beneficiario?",
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
              'El beneficiario ha sido eliminado.',
              'success'
            );
            this.ngOnInit();
          });
      }
    });
  }

}
