import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/models/funeraria/plan.model';
import { PlanService } from 'src/app/services/funeraria/plan.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;

  plan: Plan;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private service: PlanService,
    private theFormBuilder: FormBuilder,
    private router: Router
  ) {
    this.trySend = false;
    this.mode = 1;
    this.plan = { id: 0, nombre: '', precio: 0, max_beneficiarios: 0, duracion: 0, estado: true, precio_final: 0, descuento: 0 }
  }

  ngOnInit(): void {
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      precio: [0, [Validators.required, Validators.min(1)]],
      max_beneficiarios: [0, [Validators.required, Validators.min(1)]],
      duracion: [0, [Validators.required, Validators.min(1)]],
      estado: [true, [Validators.required]],
      precio_final: [0, [Validators.required, Validators.min(1)]],
      descuento: [0, [Validators.required, Validators.min(1)]]

    })
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls
  }

  getPlan(id: number) {
    this.service.view(id).subscribe(data => {
      this.plan = data
    });
  }

  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene todos los campos', 'error');
    } else {
      this.service.create(this.plan).subscribe(data => {
        Swal.fire('Creado', 'El plan ha sido creado', 'success');
        this.router.navigate(['planes/list']);
      });
    }
  }

  update(){
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene todos los campos', 'error');
    } else {
      this.activateRoute.snapshot.params.id;
      this.plan.id = this.activateRoute.snapshot.params.id;
      this.getPlan(this.plan.id);

      this.service.update(this.plan).subscribe(data => {
        Swal.fire('Actualizado', 'El plan ha sido actualizado', 'success');
        this.router.navigate(['planes/list']);
      });
    }
  }

}
