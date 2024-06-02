import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Servicio } from 'src/app/models/funeraria/servicio.model';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ServicioService } from 'src/app/services/funeraria/servicio.service';
import { SepulturaService } from 'src/app/services/funeraria/sepultura.service';
import { Sepultura } from 'src/app/models/funeraria/sepultura.model';
import { Cremacion } from 'src/app/models/funeraria/cremacion.model';
import { CremacionService } from 'src/app/services/funeraria/cremacion.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;
  servicio: Servicio;
  theFormGroup: FormGroup;
  trySend: boolean;
  sepulturas: Sepultura[];
  cremaciones: Cremacion[];

  constructor(
    private activateRoute: ActivatedRoute,
    private service: ServicioService,
    private sepulturaService: SepulturaService,
    private cremacionServices: CremacionService,
    private theFormBuilder: FormBuilder,
    private router: Router
  ) {
    this.sepulturas = [];
    this.cremaciones = [];
    this.trySend = false;
    this.mode = 1;
    this.servicio = { id: 0, nombre: "", precio: 0, descripcion: "", duracion: 0, sepultura: { id: null }, cremacion: { id: null } };
  }

  loadSepulturas() {
    this.sepulturaService.list().subscribe(data => {
      this.sepulturas = data["data"];
    });
  }

  loadCremaciones() {
    this.cremacionServices.list().subscribe(data => {
      this.cremaciones = data["data"];
    });
  }

  ngOnInit(): void {
    this.loadSepulturas();
    this.loadCremaciones();
    this.configFormGroup();
    this.configFormChanges();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
      this.theFormGroup.get('nombre')?.disable();
      this.theFormGroup.get('descripcion')?.disable();
      this.theFormGroup.get('duracion')?.disable();
      this.theFormGroup.get('precio')?.disable();
      this.theFormGroup.get('idsepultura')?.disable();
      this.theFormGroup.get('idcremacion')?.disable();
      this.getServicio(this.activateRoute.snapshot.params.id);
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
      this.getServicio(this.activateRoute.snapshot.params.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [0],
      nombre: ["", [Validators.required, Validators.minLength(1)]],
      precio: [0, [Validators.required, Validators.min(1)]],
      descripcion: ["", [Validators.required, Validators.minLength(50)]],
      duracion: [0, [Validators.required, Validators.min(2)]],
      idsepultura: [null],
      idcremacion: [null],
    });
  }

  configFormChanges() {
    let sepulturaSubscription = false;
    let cremacionSubscription = false;

    this.theFormGroup.get('idsepultura')?.valueChanges.subscribe(value => {
      if (!sepulturaSubscription) {
        sepulturaSubscription = true;
        if (value) {
          this.theFormGroup.get('idcremacion')?.disable({ emitEvent: false });
        } else {
          this.theFormGroup.get('idcremacion')?.enable({ emitEvent: false });
        }
        sepulturaSubscription = false;
      }
    });

    this.theFormGroup.get('idcremacion')?.valueChanges.subscribe(value => {
      if (!cremacionSubscription) {
        cremacionSubscription = true;
        if (value) {
          this.theFormGroup.get('idsepultura')?.disable({ emitEvent: false });
        } else {
          this.theFormGroup.get('idsepultura')?.enable({ emitEvent: false });
        }
        cremacionSubscription = false;
      }
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getServicio(id: number) {
    this.service.view(id).subscribe(data => {
      this.servicio = data;
      this.theFormGroup.patchValue(data);
    });
  }

  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    } else {
      this.service.create(this.servicio).subscribe(data => {
        Swal.fire("Creado", "El servicio ha sido creado correctamente", "success");
        this.router.navigate(['servicios/list']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    } else {
      this.servicio.id = this.activateRoute.snapshot.params.id;
      this.service.update(this.servicio).subscribe(data => {
        Swal.fire("Actualizado", "El servicio ha sido actualizado correctamente", "success");
        this.router.navigate(['servicios/list']);
      });
    }
  }
}
