import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { EjecucionservicioService } from 'src/app/services/funeraria/ejecucionservicio.service';
import { Ejecucionservicio } from 'src/app/models/funeraria/ejecucionservicio.model';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  
  mode: number;
  ejecucion: Ejecucionservicio;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private service: EjecucionservicioService,
    private theFormBuilder: FormBuilder,
    private router: Router

  ) { 
    this.trySend = false;
    this.mode = 1;
    this.ejecucion={id:0, token:"", ubicacion:"", difunto_id:0, servicio_id:0, cliente_id:0}
  }
  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
      this.theFormGroup.get('token')?.disable();
      this.theFormGroup.get('ubicacion')?.disable();
      this.theFormGroup.get('difunto_id')?.disable();
      this.theFormGroup.get('servicio_id')?.disable();
      this.theFormGroup.get('cliente_id')?.disable();

      this.getEjecucion(this.activateRoute.snapshot.params.id);
    }
    else if (currentUrl.includes('create')) {
      this.mode = 2;
    }
    else if (currentUrl.includes('update')) {
      this.mode = 3;
      this.getEjecucion(this.activateRoute.snapshot.params.id);
    }
  }
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [0],
      token: ["", [Validators.required, Validators.minLength(1)]],
      ubicacion: ["", [Validators.required, Validators.min(1)]],
      difunto_id: [0, [Validators.required]],
      servicio_id: [0, [Validators.required, Validators.min(2)]],
      cliente_id: [0, [Validators.required, Validators.min(2)]],

    });
  }
  get getTheFormGroup() {
    return this.theFormGroup.controls
  }
  getEjecucion(id: number) {
    this.service.view(id).subscribe(data => {
      this.ejecucion = data;
      this.theFormGroup.patchValue(data); // Actualiza el formulario con los datos del servicio
    });
  }
  create(){
    this.trySend = true;
    if (this.theFormGroup.invalid){
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    }else{
      this.service.create(this.ejecucion).subscribe(data => {
        Swal.fire("Creado", "La ejecucion del servicio ha sido creado correctamente", "success");
        this.router.navigate(['ejecucionservicios/list']);
      });
    }
  }
  update(){
    this.trySend = true;
    if (this.theFormGroup.invalid){
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    }else{
      this.activateRoute.snapshot.params.id;
      this.ejecucion.id = this.activateRoute.snapshot.params.id;
      this.getEjecucion(this.ejecucion.id);
      this.service.update(this.ejecucion).subscribe(data => {
        Swal.fire("Actualizado", "La ejecucion del servicio ha sido actualizada correctamente", "success");
        this.router.navigate(['ejecucionservicios/list']);
      });
    }
  }
}