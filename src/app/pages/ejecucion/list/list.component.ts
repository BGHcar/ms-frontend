import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Ejecucionservicio } from 'src/app/models/funeraria/ejecucionservicio.model';
import { EjecucionservicioService } from 'src/app/services/funeraria/ejecucionservicio.service';
import { Cliente } from 'src/app/models/funeraria/cliente.model';
import { ClienteService } from 'src/app/services/funeraria/cliente.service';
import { Beneficiario } from 'src/app/models/funeraria/beneficiario.model';
import { BeneficiarioService } from 'src/app/services/funeraria/beneficiario.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  ejecucion: Ejecucionservicio[];
  theEjecution: Ejecucionservicio;
  clientes: Cliente[];
  beneficiarios:Beneficiario[];

  constructor(private service: EjecucionservicioService, private clienteServices: ClienteService, private BeneficiarioServices:BeneficiarioService,private router: Router, private activateRoute: ActivatedRoute,
  ) {
    this.ejecucion = [];
    this.clientes=[];
    this.beneficiarios=[]
  }

  ngOnInit(): void {
    if (this.activateRoute.snapshot.queryParams.titular_id) {
      this.listByTitular(this.activateRoute.snapshot.queryParams.titular_id);
      this.listCliente();
      this.listBeneficiario();


      }
      else {
        this.list();
        this.listCliente();
        this.listBeneficiario();

      }
    }
    listCliente() {
      this.clienteServices.list().subscribe(data => {
        this.clientes = data["data"];
      });
    }
    listBeneficiario() {
      this.BeneficiarioServices.list().subscribe(data => {
        this.beneficiarios = data["data"];
      });
    }
  list() {
    this.service.list().subscribe(data => {
      
      this.ejecucion = data["data"]
      console.log(JSON.stringify(this.ejecucion));
    });
  }
  obtenerNombreCliente(id: number): string {
    const cliente = this.clientes.find(dep => dep.id === id);
    return cliente ? cliente.nombre : 'Desconocido';
  }
  obtenerNombreBeneficiario(id: number): string {
    const beneficiario = this.beneficiarios.find(dep => dep.id === id);
    return beneficiario ? beneficiario.nombre : 'Desconocido';
  }
  listByTitular(id: number) {
    this.service.listByTitular(id).subscribe(data => {
      this.ejecucion = data["data"];
    });
  }
  view(id: number) {
    console.log("id: " + id);
    this.router.navigate(['ejecucion/view/' + id]);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar la ejecucion del servicio',
      text: "Está seguro que quiere eliminar la ejecucion?",
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
            'la ejecucion ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    });
  }


  update(id: number) {
    this.router.navigate(['ejecucion/update/' + id]);
  }

  create() {
    this.router.navigate(['ejecucion/create']);
  }


}
