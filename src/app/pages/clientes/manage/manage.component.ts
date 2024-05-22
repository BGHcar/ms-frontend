import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Beneficiario } from 'src/app/models/funeraria/beneficiario.model';
import { Cliente } from 'src/app/models/funeraria/cliente.model';
import { Titular } from 'src/app/models/funeraria/titular.model';
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
  beneficiario: Beneficiario;
  titular: Titular;
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
<<<<<<< HEAD
    this.cliente = { id: 0, nombre: '', apellido: '', cedula: '', edad: 0, telefono: '', email: '', password: '', user_id: '' }
=======
    this.cliente = { id: 0, nombre: '', email: '', password: '', user_id: '' }

>>>>>>> 10e05969f96ab533063a7836d30ecda066bb79cd
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
    } else {
      this.service.security(this.cliente.nombre, this.cliente.email, this.cliente.password).subscribe(data => {
        console.log(data);
        this.cliente.user_id = JSON.parse(JSON.stringify(data))._id;
        this.service.create(this.cliente).subscribe(data => {

          Swal.fire(
            'Creado',
            'El cliente ha sido creado',
            'success'
          );
          this.router.navigate(['clientes/list']);
        });
      });
    }
  }

  createTitular() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      return;
    } else {
      this.service.security(this.cliente.nombre, this.cliente.email, this.cliente.password).subscribe(data => {
<<<<<<< HEAD
        console.log(data);
        this.cliente.user_id = JSON.parse(JSON.stringify(data))._id;
        this.service.create(this.cliente).subscribe(data => {
          this.service.createTitular(this.cliente).subscribe(data => {

            Swal.fire(
              'Creado',
              'El cliente ha sido creado',
              'success'
            );
            this.router.navigate(['clientes/list']);
          });
        }
        );
=======
        this.cliente.user_id = JSON.parse(JSON.stringify(data))._id;
        this.service.create(this.cliente).subscribe(data => {
          this.titular.user_id = data.id;
          this.titular.nombre = this.cliente.nombre;
          this.titular.email = this.cliente.email;
          this.titular.password = this.cliente.password;
        });
      });
    }
  }

  createBeneficiario() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      return;
    } else {
      this.service.security(this.cliente.nombre, this.cliente.email, this.cliente.password).subscribe(data => {
        this.cliente.user_id = JSON.parse(JSON.stringify(data))._id;
        this.service.create(this.cliente).subscribe(data => {
          this.beneficiario.user_id = data.id;
          this.beneficiario.nombre = this.cliente.nombre;
          this.beneficiario.email = this.cliente.email;
          this.beneficiario.password = this.cliente.password;
          this.beneficiario.titular_id = this.titular.id;
        });
>>>>>>> 10e05969f96ab533063a7836d30ecda066bb79cd
      });
    }
  }


  update() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      return;
    } else {
      this.activateRoute.snapshot.params.id;
      this.cliente.id = this.activateRoute.snapshot.params.id;
      this.getCliente(this.cliente.id);
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
}
