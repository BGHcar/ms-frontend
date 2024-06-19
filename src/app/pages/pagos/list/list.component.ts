import { Component, OnInit } from '@angular/core';
import { Pago } from 'src/app/models/funeraria/pago.model';
import { PagoService } from 'src/app/services/funeraria/pago.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PlanService } from 'src/app/services/funeraria/plan.service';
import { TitularService } from 'src/app/services/funeraria/titular.service';
import { SuscripcionService } from 'src/app/services/funeraria/suscripcion.service';
import Swal from 'sweetalert2';
import { Plan } from 'src/app/models/funeraria/plan.model';
import { Titular } from 'src/app/models/funeraria/titular.model';
import { Suscripcion } from 'src/app/models/funeraria/suscripcion.model';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  pagos: Pago[];
  thePago: Pago;
  handler: any;
  data: any;
  titular: Titular;
  plan: Plan;
  suscripcion: Suscripcion;
  suscripciones: Suscripcion[];

  constructor(
    private service: PagoService,
    private router: Router,
    private planService: PlanService,
    private titularService: TitularService,
    private suscripcionService: SuscripcionService,
    private activateRoute: ActivatedRoute,

  ) {
    this.pagos = [];
  }

  ngOnInit(): void {
    if (this.activateRoute.snapshot.queryParams.titular_id) {
      this.listByTitular(this.activateRoute.snapshot.queryParams.titular_id)

    }
    else {
      this.list();
    }

  }

  list() {
    this.service.list().subscribe(data => {
      this.pagos = data["data"];
    });
  }

  view(id: number) {
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

  pay(): void {
    this.chargeData();
    if (this.handler) {
      this.handler.open(this.data);
    } else {
      console.error('ePayco handler is not configured');
    }
  }

  chargeData(): void {
    this.handler = (window as any).ePayco.checkout.configure({
      key: environment.epayco_public_key,
      test: true  // Cambiar a false en producción
    });

    this.data = {
      name: this.plan.nombre,
      description: this.plan.nombre,
      invoice: `FAC-${this.plan.id}`,
      currency: "COP",
      amount: this.plan.precio_final,
      tax_base: "",
      tax: "",
      tax_ico: "",
      country: "CO",
      lang: "es",
      external: "false",
      confirmation: environment.epayco_response,
      response: environment.epayco_response,
      name_billing: this.titular.nombre + " " + this.titular.apellido,
      type_doc_billing: "cc",
      mobilephone_billing: this.titular.telefono,
      number_doc_billing: this.titular.cedula,
      email_billing: this.titular.email,
      methodconfirmation: "get"
    };
    console.log('handler : ' + JSON.stringify(this.handler));
  }

  listByTitular(id: number) {
    this.titularService.view(id).subscribe(data => {
      this.titular = data;
      this.suscripcionService.findSuscripcionByClienteId(this.titular.id).subscribe(data => {
        this.suscripciones = data["data"];
        this.suscripcion = this.suscripciones[0];
        this.planService.view(this.suscripcion.plan.id).subscribe(data => {
          this.plan = data;
          this.service.findBySubscription(this.suscripcion.id).subscribe(data => {
            this.pagos = data["data"];
          });
        });
      });
    });

  }



}