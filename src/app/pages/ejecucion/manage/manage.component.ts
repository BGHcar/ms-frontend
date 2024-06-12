import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { EjecucionservicioService } from 'src/app/services/funeraria/ejecucionservicio.service';
import { Ejecucionservicio } from 'src/app/models/funeraria/ejecucionservicio.model';
import { Cliente } from 'src/app/models/funeraria/cliente.model';
import { Servicio } from 'src/app/models/funeraria/servicio.model';
import { ServicioService } from 'src/app/services/funeraria/servicio.service';
import { ClienteService } from 'src/app/services/funeraria/cliente.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  
  mode: number;
  ejecucion: Ejecucionservicio;
  clientes: any[] = [];
  theFormGroup: FormGroup;
  trySend: boolean;
  servicios: any[] = [];


  constructor(
    private activateRoute: ActivatedRoute,
    private service: EjecucionservicioService,
    private theFormBuilder: FormBuilder,
    private router: Router,
    private serviciosServices:ServicioService,
    private clienteServices: ClienteService
  ) { 
    this.trySend = false;
    this.mode = 1;

    this.ejecucion={id:0, token:"", ubicacion:"", difunto_id:0, servicio_id:0, cliente_id:0};
  }
  loadServicios() {
    this.serviciosServices.list().subscribe((response: any) => {
      if ('data' in response) {
        this.servicios = response['data'];
      } else {
        this.servicios = response;
      }
    });
  }
  loadCliente() {
    this.clienteServices.list().subscribe((response: any) => {
      if ('data' in response) {
        this.clientes = response['data'];
      } else {
        this.clientes = response;
      }
    });
  }
  ngOnInit(): void {
    this.configFormGroup();
    this.loadServicios();
    this.loadCliente();
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
      ubicacion: ["", [Validators.required, Validators.min(1)]],
      difunto_id: [0, [Validators.required]],
      servicio_id: [0],
      cliente_id: [null],

    });
  }
  get getTheFormGroup() {
    return this.theFormGroup.controls
  }
  getEjecucion(id: number) {
    this.service.view(id).subscribe(data => {
      this.ejecucion = data;
      this.ejecucion.id = id;
      this.theFormGroup.patchValue({
        nombre: this.ejecucion.ubicacion,
        ciudad_id: this.ejecucion.difunto_id,

      });
    });
  }
  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene los campos correctamente", "error");
    } else {
      this.ejecucion.ubicacion = this.theFormGroup.get('ubicacion').value;
      this.ejecucion.difunto_id = this.theFormGroup.get('difunto_id').value;
      this.ejecucion.servicio_id = this.theFormGroup.get('servicio_id').value;
      this.ejecucion.cliente_id = this.theFormGroup.get('cliente_id').value;
      this.service.create(this.ejecucion).subscribe(data => {
        Swal.fire(
          'Creado!',
          'La Sede ha sido creada correctamente',
          'success'
        );
        this.router.navigate(['ejecucion/list']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    } else {
      this.ejecucion.id = this.activateRoute.snapshot.params.id;
      this.service.update(this.ejecucion).subscribe(data => {
        Swal.fire("Actualizado", "El servicio ha sido actualizado correctamente", "success");
        this.router.navigate(['ejecucion/list']);
      });
    }
  }
}