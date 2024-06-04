import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Plan } from 'src/app/models/funeraria/plan.model';
import { Servicio } from 'src/app/models/funeraria/servicio.model';
import { ServicioService } from 'src/app/services/funeraria/servicio.service';
import { PlanService } from 'src/app/services/funeraria/plan.service';
import { Planxservicio } from 'src/app/models/funeraria/planxservicio.model';
import { PlanxservicioService } from 'src/app/services/funeraria/planxservicio.service';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;
  planxservicio: Planxservicio;
  theFormGroup: FormGroup;
  planes: Plan[];
  servicios: Servicio[];
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private service: PlanxservicioService,
    private theFormBuilder: FormBuilder,
    private router: Router,
    private servicioServices: ServicioService,
    private planesService: PlanService
  ) {
    this.trySend = false;
    this.mode = 1;
    this.planes = [];
    this.servicios = [];
    this.planxservicio = {
      id: 0,
      plan: {
        id: null
      },
      servicio: {
        id: null
      }
    }
  };

  ServicioList() {
    this.servicioServices.list().subscribe(data => {
      this.servicios = data["data"];
    })
  }

  planesList() {
    this.planesService.list().subscribe(data => {
      this.planes = data["data"];
    })
  }



  ngOnInit(): void {
    this.ServicioList();
    this.planesList();
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
      this.planxservicio.id = this.activateRoute.snapshot.params.id;
      this.getplanxservicio(this.planxservicio.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      plan_id: [null, Validators.required],
      servicio_id: [null, Validators.required]
    })
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls
  }

  getplanxservicio(id: number) {
    this.service.view(id).subscribe(data => {
      this.planxservicio = data
      if (this.planxservicio.plan == null) {
        this.planxservicio.plan.id = null;
      }
      if (this.planxservicio.servicio == null) {
        this.planxservicio.servicio.id = null;
      }
    });
  }



  create() {
    console.log("planXservicio: " + JSON.stringify(this.planxservicio));
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    } else {
      this.service.create(this.planxservicio).subscribe(data => {
        Swal.fire("Creado", "La planXservicio ha sido creada correctamente", "success");
        this.router.navigate(['serviciosxplanes/list']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    } else {
      this.activateRoute.snapshot.params.id;
      this.planxservicio.id = this.activateRoute.snapshot.params.id;
      this.getplanxservicio(this.planxservicio.id);
      this.service.update(this.planxservicio).subscribe(data => {
        Swal.fire("Actualizado", "La planXservicio ha sido actualizada correctamente", "success");
        this.router.navigate(['serviciosxplanes/list']);
      });
    }
  }


}
