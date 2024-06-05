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
import { Traslado } from 'src/app/models/funeraria/traslado.model';
import { TrasladoService } from 'src/app/services/funeraria/traslado.service';

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
  traslado:Traslado[];

  constructor(
    private activateRoute: ActivatedRoute,
    private service: ServicioService,
    private sepulturaService: SepulturaService,
    private cremacionServices: CremacionService,
    private trasladoServices:TrasladoService,
    private theFormBuilder: FormBuilder,
    private router: Router
  ) {
    this.sepulturas = [];
    this.cremaciones = [];
    this.traslado=[];
    this.trySend = false;
    this.mode = 1;
    this.servicio = { id: 0, nombre: "", precio: 0, descripcion: "", duracion: 0, sepultura: { id: null }, cremacion: { id: null },  traslados:{id:null} };
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

  loadTraslado(){
    this.trasladoServices.list().subscribe(data => {
      this.traslado = data["data"];
    }); 
  }

  ngOnInit(): void {
    this.loadSepulturas();
    this.loadCremaciones();
    this.loadTraslado();
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
      this.theFormGroup.get('nombre')?.disable();
      this.theFormGroup.get('descripcion')?.disable();
      this.theFormGroup.get('duracion')?.disable();
      this.theFormGroup.get('precio')?.disable();
      this.theFormGroup.get('idsepultura')?.disable();
      this.theFormGroup.get('idcremacion')?.disable();
      this.theFormGroup.get('idtraslado')?.disable();
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
      idtraslado:[null],
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
      this.servicio.nombre = this.theFormGroup.get('nombre').value;
      this.servicio.precio = this.theFormGroup.get('precio').value;
      this.servicio.duracion = this.theFormGroup.get('duracion').value;
      this.servicio.descripcion = this.theFormGroup.get('descripcion').value;

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
