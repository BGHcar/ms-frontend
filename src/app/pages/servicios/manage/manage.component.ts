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
  traslados:Traslado[];

  constructor(
    private activateRoute: ActivatedRoute,
    private service: ServicioService,
    private theFormBuilder: FormBuilder,
    private router: Router
  ) {
    this.sepulturas = [];
    this.cremaciones = [];
    this.traslados=[];
    this.trySend = false;
    this.mode = 1;
    this.servicio = { id: 0, nombre: "",  descripcion: "", duracion: 0 };
  }
  


  ngOnInit(): void {

    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
      this.theFormGroup.get('nombre')?.disable();
      this.theFormGroup.get('descripcion')?.disable();
      this.theFormGroup.get('duracion')?.disable();
      this.theFormGroup.get('precio')?.disable();

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
      descripcion: ["", [Validators.required, Validators.minLength(3)]],
      duracion: [0, [Validators.required, Validators.min(3)]],

    });
  }
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getServicio(id: number) {
    this.service.view(id).subscribe(data => {
      this.servicio = data;
      this.servicio.id = id;
      this.theFormGroup.patchValue({
        nombre: this.servicio.nombre,
        descripcion: this.servicio.descripcion,
        duracion: this.servicio.duracion,


      });
    });
  }
  listTypeServices(id: number) {
    this.router.navigate([this.servicio.nombre+'/list'], { queryParams: { servicio_id: id } });
  }

  listTraslados(id: number) {
    this.router.navigate(['traslados/list'], { queryParams: { servicio_id: id } });
  }


  
  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    } else {
      this.servicio.id = this.theFormGroup.get('id').value;
      this.servicio.nombre = this.theFormGroup.get('nombre').value;
      this.servicio.duracion = this.theFormGroup.get('duracion').value;
      this.servicio.descripcion = this.theFormGroup.get('descripcion').value;
  
      this.service.create(this.servicio).subscribe(data => {
        this.servicio.id = data.id;
        Swal.fire("Creado", "El servicio ha sido creado correctamente", "success");
        this.router.navigate([this.servicio.nombre+'/create'], { queryParams: { servicio_id: this.servicio.id } });
      });
    }
  }

  
    

  update() {
    this.trySend = true;

    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene los campos correctamente", "error");
    } else {
      this.servicio.id = this.theFormGroup.get('id').value;
      this.servicio.nombre = this.theFormGroup.get('nombre').value;
      this.servicio.duracion = this.theFormGroup.get('duracion').value;
      this.servicio.descripcion = this.theFormGroup.get('descripcion').value;
      this.service.update(this.servicio).subscribe(data => {
        Swal.fire(
          
          'Actualizado!',
          'El servicio ha sido actualizada correctamente',
          'success'
        );
        this.router.navigate([this.servicio.nombre+'/create'], { queryParams: { servicio_id: this.servicio.id } });
      });
    }
  }
}
