import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Servicio } from 'src/app/models/funeraria/servicio.model';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ServicioService } from 'src/app/services/funeraria/servicio.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  
  mode: number;
  servicio: Servicio;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private service: ServicioService,
    private theFormBuilder: FormBuilder,
    private router: Router

  ) { 
    this.trySend = false;
    this.mode = 1;
    this.servicio={id:0, nombre:"", precio:0, descripcion:"", duracion:0}
  }
  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
      this.theFormGroup.get('nombre')?.disable();
      this.theFormGroup.get('descripcion')?.disable();
      this.theFormGroup.get('duracion')?.disable();
      this.theFormGroup.get('precio')?.disable();
      this.getServicio(this.activateRoute.snapshot.params.id);
    }
    else if (currentUrl.includes('create')) {
      this.mode = 2;
    }
    else if (currentUrl.includes('update')) {
      this.mode = 3;
      this.getServicio(this.activateRoute.snapshot.params.id);
    }
  }
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [0],
      nombre: ["", [Validators.required, Validators.minLength(1)]],
      precio: [0, [Validators.required, Validators.min(1)]],
      descripcion: ["", [Validators.required, Validators.minLength(50)]],
      duracion: [0, [Validators.required, Validators.min(2)]],
    });
  }
  get getTheFormGroup() {
    return this.theFormGroup.controls
  }
  getServicio(id: number) {
    this.service.view(id).subscribe(data => {
      this.servicio = data;
      this.theFormGroup.patchValue(data); // Actualiza el formulario con los datos del servicio
    });
  }
  create(){
    this.trySend = true;
    if (this.theFormGroup.invalid){
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    }else{
      this.service.create(this.servicio).subscribe(data => {
        Swal.fire("Creado", "El servicio ha sido creado correctamente", "success");
        this.router.navigate(['servicios/list']);
      });
    }
  }
  update(){
    this.trySend = true;
    if (this.theFormGroup.invalid){
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    }else{
      this.activateRoute.snapshot.params.id;
      this.servicio.id = this.activateRoute.snapshot.params.id;
      this.getServicio(this.servicio.id);
      this.service.update(this.servicio).subscribe(data => {
        Swal.fire("Actualizado", "el Servicio ha sido actualizada correctamente", "success");
        this.router.navigate(['servicios/list']);
      });
    }
  }
}