import { Component, OnInit } from '@angular/core';
import { Departamento } from 'src/app/models/funeraria/departamento.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DepartamentoService } from 'src/app/services/funeraria/departamento.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  departamentos: Departamento[];
  theDepartamento: Departamento;
  columnsName = ['nombre'];


  constructor(private service: DepartamentoService, private router: Router) {
    this.departamentos = [];
    this.columnsName = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      this.departamentos = data["data"];
      console.log(JSON.stringify(this.departamentos));
    });
  }

  view(id: number) {
    this.router.navigate(['departamentos/view/'+id]);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar Departamento',
      text: "Está seguro que quiere eliminar el departamento?",
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
              'El Departamento ha sido eliminada correctamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  };


  update(id: number) {
    this.router.navigate(['departamentos/update/'+id]);
  }

  create() {
    this.router.navigate(['departamentos/create']);
  }

}
