import { Component, OnInit } from '@angular/core';
import { Beneficiario } from 'src/app/models/funeraria/beneficiario.model';
import { BeneficiarioService } from 'src/app/services/funeraria/beneficiario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  beneficiarios: Beneficiario[];
  theBeneficiario: Beneficiario;

  constructor(
    private service: BeneficiarioService,
    private router: Router
  ) {
    this.beneficiarios = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      this.beneficiarios = data["data"];
      console.log(JSON.stringify(this.beneficiarios));
    });
  }

  view(id: number) {
    console.log("id: " + id);
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
