import { Component, OnInit } from '@angular/core';
import { Pago } from 'src/app/models/funeraria/pago.model';
import { PagoService } from 'src/app/services/funeraria/pago.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Suscripcion } from 'src/app/models/funeraria/suscripcion.model';
import { SuscripcionService } from 'src/app/services/funeraria/suscripcion.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;
  pago: Pago;
  theFormGroup: FormGroup;
  trySend: boolean;
  suscripciones: Suscripcion[];
  suscripcion: Suscripcion;


  constructor(
    private activateRoute: ActivatedRoute,
    private service: PagoService,
    private theFormBuilder: FormBuilder,
    private router: Router,
    private suscripcionService: SuscripcionService
  ) {
    this.trySend = false;
    this.mode = 1;
    this.suscripciones = [];
    this.pago = {
      id: 0, monto: 0, fecha: "",
      suscripcion: {
        id: null
      }
    }
  }

  ngOnInit(): void {
    if (this.activateRoute.snapshot.params.id) {
      this.pago.id = this.activateRoute.snapshot.params.id;
      this.getPago(this.pago.id);
    }
    this.suscripcionesList();
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    }
    else if (currentUrl.includes('create')) {
      this.mode = 2;
    }
    else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
  }

  suscripcionesList() {
    this.suscripcionService.list().subscribe(data => {
      this.suscripciones = data["data"];
    })
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [0],
      monto: [0, [Validators.required, Validators.min(1)]],
      fecha: ['', [Validators.required]],
      suscripcion_id: [null, [Validators.required]]
    })
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls
  }

  getPago(id: number) {
    console.log("id: " + id);
    this.service.view(id).subscribe(data => {
      this.pago = data;
      this.pago.fecha = this.pago.fecha.split('T')[0];
      if (!this.pago.suscripcion) {
        this.pago.suscripcion = { id: null };
      }
    });
  }


  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    } else {
      this.service.create(this.pago).subscribe(data => {
        Swal.fire("Creado", "El pago ha sido creado correctamente", "success");
        this.router.navigate(['pagos/list']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    } else {
      this.activateRoute.snapshot.params.id;
      this.pago.id = this.activateRoute.snapshot.params.id;
      this.getPago(this.pago.id)

      this.service.update(this.pago).subscribe(data => {
        Swal.fire("Actualizado", "El pago ha sido actualizado correctamente", "success");
        this.router.navigate(['pagos/list']);
      })
    }
  }

}
