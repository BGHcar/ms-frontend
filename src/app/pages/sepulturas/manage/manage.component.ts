import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Sepultura } from 'src/app/models/funeraria/sepultura.model';
import { SepulturaService } from 'src/app/services/funeraria/sepultura.service';
import { SalaService } from 'src/app/services/funeraria/sala.service';
import { Sala } from 'src/app/models/funeraria/sala.model';
import { CiudadService } from 'src/app/services/funeraria/ciudad.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  
  mode: number;
  sepultura: Sepultura;
  theFormGroup: FormGroup;
  trySend: boolean;
  salas: any[] = [];
  ciudades: any[] = [];


  constructor(
    private activateRoute: ActivatedRoute,
    private service: SepulturaService,
    private theFormBuilder: FormBuilder,
    private router: Router,
    private theSala:SalaService,
    private thecity:CiudadService,


  ) { 

    this.trySend = false;
    this.mode = 1;
    this.sepultura={id:0, ciudad_id:null, fecha_hora:"", servicio_id:null , sala_id:null}
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
      this.sepultura = data;
      this.sepultura.id = id;
      this.theFormGroup.patchValue({
        fecha_hora: this.sepultura.fecha_hora,
        sala_id: this.sepultura.sala_id
      });
    });
  }
  create(){
    this.trySend = true;
    if (this.theFormGroup.invalid){
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    }else{
      this.sepultura.ciudad_id = this.theFormGroup.get('ciudad_id').value;
      this.sepultura.fecha_hora = this.theFormGroup.get('fecha_hora').value;
      this.sepultura.sala_id = this.theFormGroup.get('sala_id').value;

      this.service.create(this.sepultura).subscribe(data => {
        Swal.fire("Creado", "El servicio ha sido creado correctamente", "success");
        this.router.navigate(['sepulturas/list']);
      });
    }
  }
  update() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene los campos correctamente", "error");
    } else {
      this.sepultura.ciudad_id = this.theFormGroup.get('ubicacion').value;
      this.sepultura.fecha_hora = this.theFormGroup.get('fecha_hora').value;
      this.sepultura.sala_id = this.theFormGroup.get('sala_id').value;
      this.service.update(this.sepultura).subscribe(data => {
        Swal.fire(
          'Actualizado!',
          'La sepultura ha sido actualizada correctamente',
          'success'
        );
        this.router.navigate(['sepulturas/list']);
      });
    }
  }
}