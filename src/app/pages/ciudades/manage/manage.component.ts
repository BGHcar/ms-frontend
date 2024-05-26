import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ciudad } from 'src/app/models/funeraria/ciudad.model';
import { CiudadService } from 'src/app/services/funeraria/ciudad.service';
import { DepartamentoService } from 'src/app/services/funeraria/departamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1-> View, 2-> Create, 3-> Update
  ciudad: Ciudad; 
  theFormGroup: FormGroup;
  trySend: boolean;
  departamentos: any[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private service: CiudadService,
    private departamentoService: DepartamentoService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trySend = false;
    this.mode = 1;
    this.ciudad = { id: 0, nombre: "", departamento_id: 0 };
  }

  ngOnInit(): void {
    this.configFormGroup();
    this.loadDepartamentos();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id && this.mode !== 2) {
      this.ciudad.id = this.activateRoute.snapshot.params.id;
      this.getCiudad(this.ciudad.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      departamento_id: [0, Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getCiudad(id: number) {
    this.service.view(id).subscribe(data => {
      this.ciudad = data;
      this.ciudad.id = id;
      this.theFormGroup.patchValue({
        nombre: this.ciudad.nombre,
        departamento_id: this.ciudad.departamento_id
      });
    });
  }

  loadDepartamentos() {
    this.departamentoService.list().subscribe((response: any) => {
      if ('data' in response) {
        this.departamentos = response['data'];
      } else {
        this.departamentos = response;
      }
    });
  }

  formatSedes(): string {
    if (this.ciudad && this.ciudad.sedes) {
      return this.ciudad.sedes.map(sala => sala.nombre).join(', ');
    } else {
      return '';
    }
  }

  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene los campos correctamente", "error");
    } else {
      this.ciudad.nombre = this.theFormGroup.get('nombre').value;
      this.ciudad.departamento_id = this.theFormGroup.get('departamento_id').value;
      this.service.create(this.ciudad).subscribe(data => {
        Swal.fire(
          'Creado!',
          'La Ciudad ha sido creada correctamente',
          'success'
        );
        this.router.navigate(['ciudades/list']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene los campos correctamente", "error");
    } else {
      this.ciudad.nombre = this.theFormGroup.get('nombre').value;
      this.ciudad.departamento_id = this.theFormGroup.get('departamento_id').value;
      this.service.update(this.ciudad).subscribe(data => {
        Swal.fire(
          'Actualizado!',
          'La Ciudad ha sido actualizada correctamente',
          'success'
        );
        this.router.navigate(['ciudades/list']);
      });
    }
  }
}
