import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/funeraria/cliente.model';
import { ClienteService } from 'src/app/services/funeraria/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;

  cliente: Cliente;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private service: ClienteService,
    private theFormBuilder: FormBuilder,
    private router: Router
  ) {
    this.trySend = false;
    this.mode = 1;
    this.cliente = { id: 0, nombre: '', apellido: '', cedula: '', telefono: '', email: '', password: '', user_id: '' }
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
      this.cliente.id = this.activateRoute.snapshot.params.id;
      this.getCliente(this.cliente.id);
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

  get getTheFormGroup() {
    return this.theFormGroup.controls
  }

  getCliente(id: number) {
    this.service.view(id).subscribe(data => {
      this.cliente = data;
    });
  }

  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      return;
    }
    this.service.create(this.cliente).subscribe(data => {
      Swal.fire(
        'Creado',
        'El cliente ha sido creado',
        'success'
      );
      this.router.navigate(['clientes/list']);
    });
  }

  update() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      return;
    }
    this.service.update(this.cliente).subscribe(data => {
      Swal.fire(
        'Actualizado',
        'El cliente ha sido actualizado',
        'success'
      );
      this.router.navigate(['clientes/list']);
    });
  }

}
