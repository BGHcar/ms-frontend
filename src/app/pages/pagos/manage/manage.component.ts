import { Component, OnInit } from '@angular/core';
import { Pago } from 'src/app/models/funeraria/pago.model';
import { PagoService } from 'src/app/services/funeraria/pago.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    private activateRoute: ActivatedRoute,
    private service: PagoService,
    private theFormBuilder: FormBuilder,
    private router: Router
  ) {
    this.trySend = false;
    this.mode = 1;
    this.pago = { id: 0, monto: 0, fecha: "", suscripcion_id: 0 }
  }

  ngOnInit(): void {
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
    if (this.activateRoute.snapshot.params.id) {
      this.pago.id = this.activateRoute.snapshot.params.id;
      console.log("pago id: " + this.pago.id);
      console.log("pago :" + this.getPago(this.pago.id));
      this.getPago(this.pago.id);
    }
    
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      monto: [0, [Validators.required, Validators.min(1)]],
      fecha: ['', [Validators.required]],
      suscripcion_id: [0, [Validators.required, Validators.min(1)]]
    })
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls
  }

  getPago(id: number) {
    this.service.view(id).subscribe(data => {
      this.pago = data
      this.pago.fecha = this.pago.fecha.split('T')[0];
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
