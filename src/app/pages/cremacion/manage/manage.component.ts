import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { SalaService } from 'src/app/services/funeraria/sala.service';
import { Cremacion } from 'src/app/models/funeraria/cremacion.model';
import { CremacionService } from 'src/app/services/funeraria/cremacion.service';
import { CiudadService } from 'src/app/services/funeraria/ciudad.service';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  
  mode: number;
  cremacion: Cremacion;
  theFormGroup: FormGroup;
  trySend: boolean;
  salas: any[] = [];
  ciudades: any[] = [];


  constructor(
    private activateRoute: ActivatedRoute,
    private service: CremacionService,
    private theFormBuilder: FormBuilder,
    private router: Router,
    private theSala:SalaService,
    private thecity:CiudadService,


  ) { 

    this.trySend = false;
    this.mode = 1;
    this.cremacion={id:0, ciudad_id:null, fecha_hora:null, servicio_id:null , sala_id:null}
  }
  loadSalas() {
    this.theSala.list().subscribe((response: any) => {
      if ('data' in response) {
        this.salas = response['data'];
      } else {
        this.salas = response;
      }
    });
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
    this.loadSalas();
    this.loadCiudades();
    const currentUrl = this.activateRoute.snapshot.url.join('/');

    const servicioId = this.activateRoute.snapshot.queryParams['servicio_id'];
    if (servicioId) {
      this.theFormGroup.patchValue({ servicio_id: servicioId });
    }
    if (currentUrl.includes('view')) {
      this.mode = 1;
      this.theFormGroup.get('ciudad_id')?.disable();
      this.theFormGroup.get('fecha_hora')?.disable();
      this.theFormGroup.get('sala_id')?.disable();
      this.getSepultura(this.activateRoute.snapshot.params.id);
    }
    else if (currentUrl.includes('create')) {
      this.mode = 2;
    }
    else if (currentUrl.includes('update')) {
      this.mode = 3;
      this.getSepultura(this.activateRoute.snapshot.params.id);
    }
  }
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id:[0],
      ciudad_id: [null],
      fecha_hora: ["", [Validators.required]],
      sala_id: [0, [Validators.required]],
      servicio_id:[null]

    })
  }
  get getTheFormGroup() {
    return this.theFormGroup.controls
  }
  getSepultura(id: number) {
    this.service.view(id).subscribe(data => {
      this.cremacion = data;
      this.cremacion.id = id;
      this.theFormGroup.patchValue({
        fecha_hora: this.cremacion.fecha_hora,
        sala_id: this.cremacion.sala_id,
        servicio_id:this.cremacion.servicio_id

      });
    });
  }
  create(){
    this.trySend = true;
    if (this.theFormGroup.invalid){
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    }else{
      this.cremacion.ciudad_id = this.theFormGroup.get('ciudad_id').value;
      this.cremacion.fecha_hora = this.theFormGroup.get('fecha_hora').value;
      this.cremacion.sala_id = this.theFormGroup.get('sala_id').value;
      this.cremacion.servicio_id = this.theFormGroup.get('servicio_id').value;  // Asignar el servicio_id

      this.service.create(this.cremacion).subscribe(data => {
        Swal.fire("Creado", "El servicio ha sido creado correctamente", "success");
        this.router.navigate(['traslados/create'], { queryParams: { servicio_id: this.cremacion.servicio_id } });
      });
    }
  }
  update() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene los campos correctamente", "error");
    } else {
      this.cremacion.ciudad_id = this.theFormGroup.get('ciudad_id').value;
      this.cremacion.fecha_hora = this.theFormGroup.get('fecha_hora').value;
      this.cremacion.sala_id = this.theFormGroup.get('sala_id').value;
      this.cremacion.servicio_id = this.theFormGroup.get('servicio_id').value;  // Asignar el servicio_id

      this.service.update(this.cremacion).subscribe(data => {
        Swal.fire(
          'Actualizado!',
          'La sepultura ha sido actualizada correctamente',
          'success'
        );
        this.router.navigate(['cremaciones/list']);
      });
    }
  }
}