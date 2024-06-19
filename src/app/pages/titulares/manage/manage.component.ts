import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Titular } from 'src/app/models/funeraria/titular.model';
import { TitularService } from 'src/app/services/funeraria/titular.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/funeraria/cliente.model';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;

  cliente: Cliente;
  titular: Titular;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private service: TitularService,
    private theFormBuilder: FormBuilder,
    private router: Router
  ) {
    this.trySend = false;
    this.mode = 1;
    this.titular = { id: 0, nombre: '', apellido: '', cedula: '', edad: 0, telefono: '', email: '', password: '', esta_vivo: true, cliente_id: 0 }
    this.cliente = { id: 0, nombre: '', email: '', password: '', user_id: '' }
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
      this.titular.id = this.activateRoute.snapshot.params.id;
      this.getTitular(this.titular.id);
    }
  }

  listBeneficiarios(id: number) {
    this.router.navigate(['beneficiarios/list'], { queryParams: { titular_id: id } });
  }

  listEjecuciones(id: number) {
    this.router.navigate(['ejecucion/list'], { queryParams: { titular_id: id } });
  }

  listPagos(id: number) {
    this.router.navigate(['pagos/list'], { queryParams: { titular_id: id } });
  }

  listSuscripciones(id: number) {
    this.router.navigate(['suscripciones/list'], { queryParams: { titular_id: id } });
  }


  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [0],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      cedula: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      edad: [0, [Validators.required, Validators.min(18), Validators.max(100)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      cliente_id: [0],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls
  }

  getTitular(id: number) {
    this.service.view(id).subscribe(data => {
      this.titular = data;
      this.titular.password = '';
    });
  }

  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      return;
    } else {
        // cliente va a ser igual a titular
        this.cliente.email = this.titular.email;
        this.cliente.nombre = this.titular.nombre;
        this.cliente.password = this.titular.password;

        this.service.security(this.cliente.nombre, this.cliente.email, this.cliente.password).subscribe(data => {
          this.cliente.user_id = JSON.parse(JSON.stringify(data))._id;
          this.service.createCliente(this.cliente).subscribe(data => {
            this.titular.cliente_id = data.id;
            console.log('titular: ' + JSON.stringify(this.titular));
            this.service.create(this.titular).subscribe(data => {
              Swal.fire(
                'Creado',
                'El titular ha sido creado',
                'success'
              );
              this.router.navigate(['titulares/list']);
            });
          });
        });
    }
  }


  update() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      return;
    }
    this.service.update(this.titular).subscribe(data => {
      Swal.fire(
        'Actualizado!',
        'El titular ha sido actualizado.',
        'success'
      );
      this.router.navigate(['titulares/list']);
    });
  }
  listchats(){
    this.router.navigate(['chats/list'])
  }
}
