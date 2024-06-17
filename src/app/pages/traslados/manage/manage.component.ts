import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Traslado } from 'src/app/models/funeraria/traslado.model';
import { CiudadService } from 'src/app/services/funeraria/ciudad.service';
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
  ciudades: any[] = [];


  constructor(
    private activateRoute: ActivatedRoute,
    private service: TrasladoService,
    private theFormBuilder: FormBuilder,
    private router: Router,
    private thecity:CiudadService,


  ) { 

    this.trySend = false;
    this.mode = 1;
    this.traslado={id:0, ciudad_id:0, direccion:"", servicio_id:null }
  }

  loadCiudades() {
    this.thecity.list().subscribe((response: any) => {
      if ('data' in response) {
        this.ciudades = response['data'];
      } else {
        this.ciudades = response;
      }
    });
  }
  ngOnInit(): void {
    this.configFormGroup();
    this.loadCiudades();
    const currentUrl = this.activateRoute.snapshot.url.join('/');

    const servicioId = this.activateRoute.snapshot.queryParams['servicio_id'];
    if (servicioId) {
      this.theFormGroup.patchValue({ servicio_id: servicioId });
    }
    if (currentUrl.includes('view')) {
      this.mode = 1;
      this.theFormGroup.get('ciudad_id')?.disable();
      this.theFormGroup.get('direccion')?.disable();
      
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
      ciudad_id: [null],
      direccion: ["", [Validators.required]],
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
        ciudad_id: this.traslado.ciudad_id,
        direccion: this.traslado.direccion,
        servicio_id:this.traslado.servicio_id

      });
    });
  }
  create(){
    this.trySend = true;
    if (this.theFormGroup.invalid){
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    }else{
      this.traslado.ciudad_id = this.theFormGroup.get('ciudad_id').value;
      this.traslado.direccion = this.theFormGroup.get('direccion').value;
      this.traslado.servicio_id = this.theFormGroup.get('servicio_id').value;  // Asignar el servicio_id

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
      this.traslado.ciudad_id = this.theFormGroup.get('ciudad_id').value;
      this.traslado.direccion = this.theFormGroup.get('direccion').value;
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