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
import { BeneficiarioService } from 'src/app/services/funeraria/beneficiario.service';
import { TitularService } from 'src/app/services/funeraria/titular.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  
  mode: number;
  ejecucion: Ejecucionservicio;
  titulares: any[] = [];
  theFormGroup: FormGroup;
  trySend: boolean;
  servicios: any[] = [];
  beneficiarios:any[]=[];

  constructor(
    private activateRoute: ActivatedRoute,
    private service: EjecucionservicioService,
    private theFormBuilder: FormBuilder,
    private router: Router,
    private serviciosServices:ServicioService,
    private titularServices: TitularService,
    private BeneficiariosServices:BeneficiarioService
  ) { 
    this.trySend = false;
    this.mode = 1;

    this.ejecucion={id:0, token:"", difunto_id:0, servicio_id:0, cliente_id:0};
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
  loadBeneficiarios() {
    this.BeneficiariosServices.list().subscribe((response: any) => {
      if ('data' in response) {
        this.beneficiarios = response['data'];
      } else {
        this.beneficiarios = response;
      }
    });
  }
  loadTitular() {
    this.titularServices.list().subscribe((response: any) => {
      if ('data' in response) {
        this.titulares = response['data'];
      } else {
        this.titulares = response;
      }
    });
  }
  ngOnInit(): void {
    this.configFormGroup();
    this.loadServicios();
    this.loadTitular();
    this.loadBeneficiarios();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    const servicioId = this.activateRoute.snapshot.queryParams['servicio_id'];
    let titular = JSON.parse(localStorage.getItem("TitularActivo"))
    const titularId = titular.id
    if (titularId) {
      this.theFormGroup.patchValue({ cliente_id: titularId });
    }
    if (servicioId) {
      this.theFormGroup.patchValue({ servicio_id: servicioId });
    }
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
  guardarid() {
    // Obtener la sesión almacenada en localStorage
    const sesionString = localStorage.getItem('sesion');

    if (sesionString) {
      // Convertir la sesión de JSON a objeto JavaScript
      const sesion = JSON.parse(sesionString);

      // Obtener el email del objeto de sesión
      const emailLocalStorage = sesion.email;

      if (emailLocalStorage) {
        // Buscar el cliente con el email correspondiente
        this.service.list().subscribe(data => {
          const titular = data["data"];
          titular.password = "";
          const TitularEncontrado = titular.find(titular => titular.email === emailLocalStorage);

          if (TitularEncontrado) {
            // Si se encuentra el cliente, guardar su información en localStorage
            localStorage.setItem('TitularActivo', JSON.stringify(TitularEncontrado));
          } else {
            // Si no se encuentra el cliente, eliminar la información previamente guardada
            localStorage.removeItem('Titular');
          }
        });
      } else {
        // No hay email almacenado en la sesión
        console.error('No hay email almacenado en la sesión');
      }
    } else {
      // No hay sesión almacenada en localStorage
      console.error('No hay sesión almacenada en localStorage');
    }
  }
  MostrarServicio(id: number) {
    this.router.navigate(['servicios/view/' + this.ejecucion.servicio_id]);
  }
  MostrarDifunto(id: number) {
    this.router.navigate(['beneficiarios/view/' + this.ejecucion.difunto_id]);
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [0],
      difunto_id: [0],
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

      });
    });
  }
  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene los campos correctamente", "error");
    } else {
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