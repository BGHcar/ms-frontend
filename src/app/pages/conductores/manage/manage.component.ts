import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Conductor } from 'src/app/models/funeraria/conductor.model';
import { ConductorService } from 'src/app/services/funeraria/conductor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;

  conductor: Conductor;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private service: ConductorService,
    private theFormBuilder: FormBuilder,
    private router: Router
  ) {
    this.trySend = false;
    this.mode = 1;
    this.conductor = { id: 0, nombre: '', apellido: '', cedula: '', telefono: '', email: '', password: '', user_id: '' }
  }

  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      console.log("cambiando a modo 1");
      this.mode = 1;
    }
    else if (currentUrl.includes('create')) {
      console.log("cambiando a modo 2");
      this.mode = 2;
    }
    else if (currentUrl.includes('update')) {
      console.log("cambiando a modo 3");
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.conductor.id = this.activateRoute.snapshot.params.id;
      this.getConductor(this.conductor.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [0],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      cedula: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      user_id: ['']
    });
  }

  getConductor(id: number) {
    this.service.view(id).subscribe(data => {
      this.conductor = data;
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene los campos requeridos', 'error');
    } else {
      this.service.security(this.conductor.nombre, this.conductor.email, this.conductor.password).subscribe(data => {
        this.conductor.user_id = JSON.parse(JSON.stringify(data))._id;
        this.conductor.password = JSON.parse(JSON.stringify(data)).password;
        this.service.create(this.conductor).subscribe(data => {
          Swal.fire(
            'Creado',
            'El conductor ha sido creado correctamente',
            'success'
          )
          this.router.navigate(['conductores/list']);
        });
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene los campos requeridos', 'error');
    } else {
      this.activateRoute.snapshot.params.id;
      this.conductor.id = this.activateRoute.snapshot.params.id;
      this.getConductor(this.conductor.id);
      this.service.update(this.conductor).subscribe(data => {
        Swal.fire(
          'Actualizado!',
          'El conductor ha sido actualizado correctamente',
          'success'
        );
        this.router.navigate(['conductores/list']);
      });
    }
  }
}