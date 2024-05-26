import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Departamento } from 'src/app/models/funeraria/departamento.model';
import { DepartamentoService } from 'src/app/services/funeraria/departamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  // 1-> View, 2-> Create, 3-> Update
  mode: number;

  //  
  departamento: Departamento;
  theFormGroup: FormGroup;
  trySend: boolean;
  constructor(private activateRoute: ActivatedRoute,
    private service: DepartamentoService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trySend = false;
    this.mode = 1;
    this.departamento = { id: 0, nombre:" "}
  }

  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    }
    else if (currentUrl.includes('create')) {
      this.mode = 2;
    }
    else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.departamento.id = this.activateRoute.snapshot.params.id;
      this.getDepartamento(this.departamento.id);
      console.log("Departamento: " + JSON.stringify(this.departamento));
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
    })
  }
  get getTheFormGroup() {
    return this.theFormGroup.controls
  }
  // getTheaterData(){
  //   this.theater.capacity=this.getTheFormGroup.capacity.value
  //   this.theater.location=this.getTheFormGroup.location.value
  // }

  getDepartamento(id: number) {
    this.service.view(id).subscribe(data => {
      this.departamento = data;
      // Actualiza el valor del ID después de recibir los datos
      this.departamento.id = id;
      console.log("Departamento: " + JSON.stringify(this.departamento));
    });
  }

  formatCiudades(): string {
    if (this.departamento && this.departamento.ciudades) {
      return this.departamento.ciudades.map(ciudad => ciudad.nombre).join(', ');
    } else {
      return '';
    }
  }

  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene los campos correctamente", "error")
    }else{
    this.service.create(this.departamento).subscribe(data => {
      Swal.fire(
        'Creado!',
        'El Departamento ha sido creado correctamente',
        'success'
      )
      this.router.navigate(['departamentos/list']);

    })
    }
  }

  update() {

    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene los campos correctamente", "error")
    }else{
    this.activateRoute.snapshot.params.id;
    this.departamento.id = this.activateRoute.snapshot.params.id;
    this.getDepartamento(this.departamento.id);

    this.service.update(this.departamento).subscribe(data => {



      Swal.fire(
        'Actualizado!',
        'El Departamento ha sido actualizado correctamente',
        'success'
      )
      this.router.navigate(['departamentos/list']);
    })
  }
}

}
