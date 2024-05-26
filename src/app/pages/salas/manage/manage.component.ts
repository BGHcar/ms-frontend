import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Sala } from 'src/app/models/funeraria/sala.model';
import { SalaService } from 'src/app/services/funeraria/sala.service';
import { SedeService } from 'src/app/services/funeraria/sede.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1-> View, 2-> Create, 3-> Update
  sala: Sala; 
  theFormGroup: FormGroup;
  trySend: boolean;
  sedes: any[] = [];
  nombreSede: string; // Propiedad para almacenar el nombre de la sede

  constructor(
    private activateRoute: ActivatedRoute,
    private service: SalaService,
    private sedeService: SedeService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trySend = false;
    this.mode = 1;
    this.sala = { id: 0, nombre: "", capacidad: 0, disponibilidad:true, sede_id:0};
  }

  ngOnInit(): void {
    this.configFormGroup();
    this.loadSedes();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id && this.mode !== 2) {
      this.sala.id = this.activateRoute.snapshot.params.id;
      this.getSala(this.sala.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      capacidad: [0, Validators.required],
      disponibilidad: [true, Validators.required],
      sede_id: [0, Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getSala(id: number) {
    this.service.view(id).subscribe(data => {
      this.sala = data;
      this.sala.id = id;
  
      // Verifica si `disponibilidad` es un número y conviértelo a booleano
      this.sala.disponibilidad = Number(this.sala.disponibilidad) === 1;
  
      this.theFormGroup.patchValue({
        nombre: this.sala.nombre,
        capacidad: this.sala.capacidad,
        disponibilidad: this.sala.disponibilidad,
        sede_id: this.sala.sede_id
      });
  
      // Establecer el valor inicial de la disponibilidad del control en función de la disponibilidad de la sala
      this.theFormGroup.get('disponibilidad').setValue(this.sala.disponibilidad);
  
      // Buscar el nombre de la sede correspondiente al ID de la sala
      const sede = this.sedes.find(s => s.id === this.sala.sede_id);
      this.nombreSede = sede ? sede.nombre : '';
    });
  }
  

  

  loadSedes() {
    this.sedeService.list().subscribe((response: any) => {
      if ('data' in response) {
        this.sedes = response['data'];
      } else {
        this.sedes = response;
      }
  
      // Llamar a getSala() solo después de que se hayan cargado las sedes
      const currentUrl = this.activateRoute.snapshot.url.join('/');
      if (this.activateRoute.snapshot.params.id && this.mode !== 2) {
        this.sala.id = this.activateRoute.snapshot.params.id;
        this.getSala(this.sala.id);
      }
    });
  }

  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene los campos correctamente", "error");
    } else {
      this.sala.nombre = this.theFormGroup.get('nombre').value;
      this.sala.capacidad = this.theFormGroup.get('capacidad').value;
      this.sala.disponibilidad = this.theFormGroup.get('disponibilidad').value;
      this.sala.sede_id = this.theFormGroup.get('sede_id').value;
      this.service.create(this.sala).subscribe(data => {
        Swal.fire(
          'Creado!',
          'La Sala ha sido creada correctamente',
          'success'
        );
        this.router.navigate(['salas/list']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene los campos correctamente", "error");
    } else {
      this.sala.nombre = this.theFormGroup.get('nombre').value;
      this.sala.capacidad = this.theFormGroup.get('capacidad').value;
      this.sala.disponibilidad = this.theFormGroup.get('disponibilidad').value;
      this.sala.sede_id = this.theFormGroup.get('sede_id').value;
      this.service.update(this.sala).subscribe(data => {
        Swal.fire(
          'Actualizado!',
          'La Sala ha sido actualizada correctamente',
          'success'
        );
        this.router.navigate(['salas/list']);
      });
    }
  }
}
