import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Administrador } from 'src/app/models/funeraria/administrador.model';
import { AdministradorService } from 'src/app/services/funeraria/administrador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;

  administrador: Administrador;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private service: AdministradorService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trySend = false;
    this.mode = 1;
    this.administrador = { id: 0, name: '', email: '', age: 0 }
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
      this.administrador.id = this.activateRoute.snapshot.params.id;
      this.getAdministrador(this.administrador.id);
      console.log("administrador: " + JSON.stringify(this.administrador));
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [0],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      age: [0, [Validators.required, Validators.min(1), Validators.max(100)]]
    })
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls
  }

  getAdministrador(id: number) {
    this.service.view(id).subscribe(data => {
      this.administrador = data
    });
  }

  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene los campos requeridos', 'error');
    } else {
      this.service.create(this.administrador).subscribe(data => {
        Swal.fire(
          'Creado!',
          'El administrador ha sido creado correctamente',
          'success'
        )
        this.router.navigate(['administradores/list']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene los campos requeridos', 'error');
    } else {
      this.activateRoute.snapshot.params.id;
      this.administrador.id = this.activateRoute.snapshot.params.id;
      this.getAdministrador(this.administrador.id);
      this.service.update(this.administrador).subscribe(data => {
        Swal.fire(
          'Actualizado!',
          'El administrador ha sido actualizado correctamente',
          'success'
        )
        this.router.navigate(['administradores/list']);
      });
    }
  }

}
