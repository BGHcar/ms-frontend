import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/funeraria/cliente.model';
import { ClienteService } from 'src/app/services/funeraria/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  clientes: Cliente[];
  theCliente: Cliente;

  constructor(
    private service: ClienteService,
    private router: Router
  ) 
  { 
    this.clientes = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      this.clientes = data["data"];
      console.log(JSON.stringify(this.clientes));
    });
  }

  view(id: number) {
    console.log("id: "+id);
    this.router.navigate(['clientes/view/'+id]);
  }

  update(id: number) {
    this.router.navigate(['clientes/update/'+id]);
  }

  createTitular() {
    this.router.navigate(['titulares/create']);
  }

  createBeneficiario() {
    this.router.navigate(['beneficiarios/create']);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar Cliente',
      text: "Está seguro que quiere eliminar el cliente?",
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
              'Eliminado',
              'El cliente ha sido eliminado',
              'success'
            );
            this.ngOnInit();
          });
      }
    });
  }

}