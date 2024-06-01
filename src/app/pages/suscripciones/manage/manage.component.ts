import { Component, OnInit } from '@angular/core';
import { Suscripcion } from 'src/app/models/funeraria/suscripcion.model';
import { SuscripcionService } from 'src/app/services/funeraria/suscripcion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Titular } from 'src/app/models/funeraria/titular.model';
import { Plan } from 'src/app/models/funeraria/plan.model';
import { TitularService } from 'src/app/services/funeraria/titular.service';
import { PlanService } from 'src/app/services/funeraria/plan.service';
import { Cliente } from 'src/app/models/funeraria/cliente.model';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;
  suscripcion: Suscripcion;
  theFormGroup: FormGroup;
  titulares: Titular[];
  planes: Plan[];
  clientes: Cliente[];
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private service: SuscripcionService,
    private theFormBuilder: FormBuilder,
    private router: Router,
    private titularesService: TitularService,
    private planesService: PlanService
  ) {
    this.trySend = false;
    this.mode = 1;
    this.titulares = [];
    this.planes = [];
    this.clientes = [];
    this.suscripcion = {
      id: 0,
      plan: {
        id: null
      },
      cliente: {
        id: null
      }
    }
  };

  titularesList() {
    this.titularesService.list().subscribe(data => {
      this.titulares = data["data"];
    })
  }

  planesList() {
    this.planesService.list().subscribe(data => {
      this.planes = data["data"];
    })
  }

  clientesList() {
    this.titularesService.list().subscribe(data => {
      this.clientes = data["data"];
    })
  }

  ngOnInit(): void {
    this.titularesList();
    this.planesList();
    this.clientesList();
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
      this.suscripcion.id = this.activateRoute.snapshot.params.id;
      this.getSuscripcion(this.suscripcion.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      plan_id: [null, Validators.required],
      cliente_id: [null, Validators.required]
    })
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls
  }

  getSuscripcion(id: number) {
    this.service.view(id).subscribe(data => {
      this.suscripcion = data
      if (this.suscripcion.plan == null) {
        this.suscripcion.plan.id = null;
      }
      if (this.suscripcion.cliente == null) {
        this.suscripcion.cliente.id = null;
      }
    });
  }



  create() {
    console.log("suscripcion: " + JSON.stringify(this.suscripcion));
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    } else {
      this.service.create(this.suscripcion).subscribe(data => {
        Swal.fire("Creado", "La suscripción ha sido creada correctamente", "success");
        this.router.navigate(['suscripciones/list']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    } else {
      this.activateRoute.snapshot.params.id;
      this.suscripcion.id = this.activateRoute.snapshot.params.id;
      this.getSuscripcion(this.suscripcion.id);
      this.service.update(this.suscripcion).subscribe(data => {
        Swal.fire("Actualizado", "La suscripción ha sido actualizada correctamente", "success");
        this.router.navigate(['suscripciones/list']);
      });
    }
  }


}
