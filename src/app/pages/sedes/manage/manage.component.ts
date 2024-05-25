import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Sede } from 'src/app/models/funeraria/sede.model';
import { SedeService } from 'src/app/services/funeraria/sede.service';
import { CiudadService } from 'src/app/services/funeraria/ciudad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1-> View, 2-> Create, 3-> Update
  sede: Sede; 
  theFormGroup: FormGroup;
  trySend: boolean;
  ciudades: any[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private service: SedeService,
    private ciudadService: CiudadService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trySend = false;
    this.mode = 1;
    this.sede = { id: 0, nombre: "", direccion:"", telefono:0,correo_electronico:"", ciudad_id: 0 };
  }

  ngOnInit(): void {
    this.configFormGroup();
    this.loadCiudades();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id && this.mode !== 2) {
      this.sede.id = this.activateRoute.snapshot.params.id;
      this.getSede(this.sede.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      direccion: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]], // Agrega validaciones para dirección
      telefono: [0, [Validators.required]], // Agrega validaciones para teléfono
      correo_electronico: ['', [Validators.required, Validators.email]], // Agrega validaciones para correo electrónico
      ciudad_id: [0, Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getSede(id: number) {
    this.service.view(id).subscribe(data => {
      this.sede = data;
      this.sede.id = id;
      this.theFormGroup.patchValue({
        nombre: this.sede.nombre,
        ciudad_id: this.sede.ciudad_id
      });
    });
  }

  loadCiudades() {
    this.ciudadService.list().subscribe((response: any) => {
      if ('data' in response) {
        this.ciudades = response['data'];
      } else {
        this.ciudades = response;
      }
    });
  }

  formatSalas(): string {
    if (this.sede && this.sede.salas) {
      return this.sede.salas.map(sala => sala.nombre).join(', ');
    } else {
      return '';
    }
  }

  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene los campos correctamente", "error");
    } else {
      this.sede.nombre = this.theFormGroup.get('nombre').value;
      this.sede.direccion = this.theFormGroup.get('direccion').value;
      this.sede.telefono = this.theFormGroup.get('telefono').value;
      this.sede.correo_electronico = this.theFormGroup.get('correo_electronico').value;
      this.sede.ciudad_id = this.theFormGroup.get('ciudad_id').value;
      this.service.create(this.sede).subscribe(data => {
        Swal.fire(
          'Creado!',
          'La Sede ha sido creada correctamente',
          'success'
        );
        this.router.navigate(['sedes/list']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene los campos correctamente", "error");
    } else {
      this.sede.nombre = this.theFormGroup.get('nombre').value;
      this.sede.direccion = this.theFormGroup.get('direccion').value;
      this.sede.telefono = this.theFormGroup.get('telefono').value;
      this.sede.correo_electronico = this.theFormGroup.get('correo_electronico').value;
      this.sede.ciudad_id = this.theFormGroup.get('ciudad_id').value;
      this.service.update(this.sede).subscribe(data => {
        Swal.fire(
          'Actualizado!',
          'La Sede ha sido actualizada correctamente',
          'success'
        );
        this.router.navigate(['sedes/list']);
      });
    }
  }

}
