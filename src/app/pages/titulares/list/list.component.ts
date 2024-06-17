import { Component, OnInit } from '@angular/core';
import { Titular } from 'src/app/models/funeraria/titular.model';
import { TitularService } from 'src/app/services/funeraria/titular.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/funeraria/cliente.service';
import { Cliente } from 'src/app/models/funeraria/cliente.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  titulares: Titular[];
  theTitular: Titular;
  theCliente: Cliente;

  constructor(

    private service: TitularService,
    private clienteService: ClienteService,
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
    this.router.navigate(['titulares/view/' + id]);
  }

  update(id: number) {
    this.router.navigate(['titulares/update/' + id]);
  }

  create() {
    this.router.navigate(['titulares/create']);
  }


  delete(titular: Titular) {
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
        this.clienteService.view(titular.cliente_id).subscribe(data => {
          this.theCliente = data;
          if (titular.beneficiarios.length > 0) {
            titular.beneficiarios.forEach(beneficiario => {
              this.clienteService.view(beneficiario.cliente_id).subscribe(data => {
                this.theCliente = data;
                this.clienteService.deleteUser(this.theCliente.user_id).subscribe(data => {
                  this.clienteService.delete(beneficiario.cliente_id).subscribe(data => {
                  });
                });
              });
            });
          };
          this.clienteService.deleteUser(this.theCliente.user_id).subscribe(data => {
            this.clienteService.delete(titular.cliente_id).subscribe(data => {
              Swal.fire(
                'Eliminado!',
                'El titular ha sido eliminado.',
                'success'
              );
              this.list();
            });
          });
        })
      }
    });
  }
}
