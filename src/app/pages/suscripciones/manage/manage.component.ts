import { Component, OnInit } from '@angular/core';
import { Suscripcion } from 'src/app/models/funeraria/suscripcion.model';
import { SuscripcionService } from 'src/app/services/funeraria/suscripcion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;
  suscripcion: Suscripcion;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private service: SuscripcionService,
    private theFormBuilder: FormBuilder,
    private router: Router
  ) { 
    this.trySend = false;
    this.mode = 1;
    this.suscripcion = { id: 0, plan_id: 0, cliente_id: 0}
  }

  ngOnInit(): void {
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
    if (this.activateRoute.snapshot.params.id) {
      this.suscripcion.id = this.activateRoute.snapshot.params.id;
      this.getSuscripcion(this.suscripcion.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      plan_id: [0, [Validators.required, Validators.min(1)]],
      cliente_id: [0, [Validators.required, Validators.min(1)]]
    })
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls
  }

  getSuscripcion(id: number) {
    this.service.view(id).subscribe(data => {
      this.suscripcion = data
    });
  }

  create(){
    this.trySend = true;
    if (this.theFormGroup.invalid){
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    }else{
      this.service.create(this.suscripcion).subscribe(data => {
        Swal.fire("Creado", "La suscripción ha sido creada correctamente", "success");
        this.router.navigate(['suscripciones/list']);
      });
    }
  }

  update(){
    this.trySend = true;
    if (this.theFormGroup.invalid){
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    }else{
      this.activateRoute.snapshot.params.id;
      this.suscripcion.id = this.activateRoute.snapshot.params.id;
      this.getSuscripcion(this.suscripcion.id);
      this.service.update(this.suscripcion).subscribe(data => {
        Swal.fire("Actualizado", "La suscripción ha sido actualizada correctamente", "success");
        this.router.navigate(['suscripciones/list']);
      });
    }
  }


}
