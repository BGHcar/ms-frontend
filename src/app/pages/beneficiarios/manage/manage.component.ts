import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Beneficiario } from 'src/app/models/funeraria/beneficiario.model';
import { BeneficiarioService } from 'src/app/services/funeraria/beneficiario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Cliente } from 'src/app/models/funeraria/cliente.model';
import { Titular } from 'src/app/models/funeraria/titular.model';
import { TitularService } from 'src/app/services/funeraria/titular.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;

  beneficiario: Beneficiario;
  cliente: Cliente;
  theFormGroup: FormGroup;
  trySend: boolean;
  titulares: Titular[];

  constructor(
    private activateRoute: ActivatedRoute,
    private service: BeneficiarioService,
    private theFormBuilder: FormBuilder,
    private router: Router,
    private titularesService: TitularService
  ) {
    this.trySend = false;
    this.mode = 1;
    this.beneficiario = { id: 0, nombre: '', apellido: '', cedula: '', edad: 0, telefono: '', email: '', password: '',esta_vivo:true , cliente_id: 0, 
      titular: { 
        id: null,
      }
     }
    this.cliente = { id: 0, nombre: '', email: '', password: '', user_id: '' }
  }

  ngOnInit(): void {
    this.titularesList();
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
      this.beneficiario.id = this.activateRoute.snapshot.params.id;
      this.getBeneficiario(this.beneficiario.id);
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
      edad: [0, [Validators.required, Validators.min(18), Validators.max(100)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      cliente_id: [0,],
      titular_id: ['', [Validators.required]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  titularesList() {
    this.titularesService.list().subscribe(data => {
      this.titulares = data["data"];
    })
  }

  getBeneficiario(id: number) {
    this.service.view(id).subscribe(
      data => {
        this.beneficiario = data;
      });
  }

  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      return;
    } else {
      this.cliente.nombre = this.beneficiario.nombre;
      this.cliente.email = this.beneficiario.email;
      this.cliente.password = this.beneficiario.password;
      this.service.security(this.cliente.nombre, this.cliente.email, this.cliente.password).subscribe(data => {
        this.cliente.user_id = JSON.parse(JSON.stringify(data))._id;
        this.service.createCliente(this.cliente).subscribe(data => {
          this.beneficiario.cliente_id = data.id;
          this.service.create(this.beneficiario).subscribe(data => {
            Swal.fire(
              'Creado',
              'El beneficiario ha sido creado.',
              'success'
            );
            this.router.navigate(['/beneficiarios/list']);
          });
        });
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      return;
    } else {
      this.activateRoute.snapshot.params.id;
      this.beneficiario.id = this.activateRoute.snapshot.params.id;
      this.getBeneficiario(this.beneficiario.id);
      this.service.update(this.beneficiario).subscribe(data => {
        Swal.fire(
          'Actualizado!',
          'El beneficiario ha sido actualizado.',
          'success'
        );
        this.router.navigate(['/beneficiarios/list']);
      });
    }
  }


}