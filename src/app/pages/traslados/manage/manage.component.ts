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
    private router: Router,


  ) { 

    this.trySend = false;
    this.mode = 1;
    this.traslado={id:0, origen:"", fecha_hora:"", servicio_id:null , destino:""}
  }
  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
      this.theFormGroup.get('origen')?.disable();
      this.theFormGroup.get('fecha_hora')?.disable();
      this.theFormGroup.get('destino')?.disable();
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
      id:[0],
      origen: ["", [Validators.required, Validators.min(1)]],
      fecha_hora: ["", [Validators.required]],
      destino: ["", [Validators.required]],
      servicio_id:[null]

    })
  }
  get getTheFormGroup() {
    return this.theFormGroup.controls
  }
  getTraslado(id: number) {
    this.service.view(id).subscribe(data => {
      this.traslado = data;
      this.traslado.id = id;
      this.theFormGroup.patchValue({
        origen: this.traslado.origen,
        fecha_hora: this.traslado.fecha_hora,
        destino: this.traslado.destino
      });
    });
  }
  create(){
    this.trySend = true;
    if (this.theFormGroup.invalid){
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    }else{
      this.traslado.origen = this.theFormGroup.get('origen').value;
      this.traslado.fecha_hora = this.theFormGroup.get('fecha_hora').value;
      this.traslado.destino = this.theFormGroup.get('destino').value;

      this.service.create(this.traslado).subscribe(data => {
        Swal.fire("Creado", "El Traslado ha sido creado correctamente", "success");
        this.router.navigate(['traslados/list']);
      });
    }
  }
  update() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene los campos correctamente", "error");
    } else {
      this.traslado.destino = this.theFormGroup.get('destino').value;
      this.traslado.fecha_hora = this.theFormGroup.get('fecha_hora').value;
      this.traslado.origen = this.theFormGroup.get('origen').value;
      this.service.update(this.traslado).subscribe(data => {
        Swal.fire(
          'Actualizado!',
          'El traslado ha sido actualizada correctamente',
          'success'
        );
        this.router.navigate(['traslados/list']);
      });
    }
  }
}