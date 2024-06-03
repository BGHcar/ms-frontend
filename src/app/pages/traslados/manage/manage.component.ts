import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Traslado } from 'src/app/models/funeraria/traslado.model';
import { TrasladoService } from 'src/app/services/funeraria/traslado.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  
  mode: number;
  traslado: Traslado;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private service: TrasladoService,
    private theFormBuilder: FormBuilder,
    private router: Router

  ) { 
    this.trySend = false;
    this.mode = 1;
    this.traslado={id:0, origen:"", destino:"",fecha_hora:null, tipo_vehiculo:"", servicio_id:null}
  }
  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
      this.theFormGroup.get('origen')?.disable();
      this.theFormGroup.get('destino')?.disable();
      this.theFormGroup.get('fecha_hora')?.disable();
      this.theFormGroup.get('servicio_id')?.disable();
      this.theFormGroup.get('tipo_vehiculo')?.disable();
      this.getTraslado(this.activateRoute.snapshot.params.id);
    }
    else if (currentUrl.includes('create')) {
      this.mode = 2;
    }
    else if (currentUrl.includes('update')) {
      this.mode = 3;
      this.getTraslado(this.activateRoute.snapshot.params.id);
    }
  }
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      origen: ["", [Validators.required, Validators.min(1)]],
      destino: ["", [Validators.required], Validators.min(1)],
      fecha_hora: [null, [Validators.required]],
      tipo_vehiculo: ["", [Validators.required]],

    })
  }
  get getTheFormGroup() {
    return this.theFormGroup.controls
  }
  getTraslado(id: number) {
    this.service.view(id).subscribe(
      data => {this.traslado = data;
      });
  }
  create(){
    this.trySend = true;
    if (this.theFormGroup.invalid){
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    }else{
      this.service.create(this.traslado).subscribe(data => {
        this.traslado.fecha_hora = this.traslado.fecha_hora;
        this.traslado.origen = this.traslado.origen;
        this.traslado.destino = this.traslado.destino;
        this.traslado.fecha_hora = this.traslado.fecha_hora;
        this.traslado.tipo_vehiculo = this.traslado.tipo_vehiculo;
        this.traslado.id = this.traslado.id;
        Swal.fire("Creado", "El servicio de traslado ha sido creado correctamente", "success");
        this.router.navigate(['tralados/list']);
      });
    }
  }
  update(){
    this.trySend = true;
    if (this.theFormGroup.invalid){
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    }else{
      this.activateRoute.snapshot.params.id;
      this.traslado.id = this.activateRoute.snapshot.params.id;
      this.getTraslado(this.traslado.id);
      this.service.update(this.traslado).subscribe(data => {
        Swal.fire("Actualizado", "El servicio de traslado ha sido actualizada correctamente", "success");
        this.router.navigate(['traslados/list']);
      });
    }
  }
}