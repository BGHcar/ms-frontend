import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comentario } from 'src/app/models/funeraria/comentario.model';
import { ComentarioService } from 'src/app/services/funeraria/comentario.service';
import { EjecucionservicioService } from 'src/app/services/funeraria/ejecucionservicio.service'; // Servicio para obtener los servicios disponibles
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1-> View, 2-> Create, 3-> Update
  comentario: Comentario; 
  theFormGroup: FormGroup;
  trySend: boolean;
  serviciosDisponibles: any[] = []; // Array para almacenar los servicios disponibles

  constructor(
    private activateRoute: ActivatedRoute,
    private service: ComentarioService,
    private ejecucionservicioService: EjecucionservicioService, // Servicio para obtener los servicios disponibles
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trySend = false;
    this.mode = 1;
    this.comentario = { id: 0, contenido:"" ,eservicio_id:0 };
  }

  ngOnInit(): void {
    this.configFormGroup();
    this.loadServicios(); // Cargar servicios disponibles
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id && this.mode !== 2) {
      this.comentario.id = this.activateRoute.snapshot.params.id;
      this.getComentario(this.comentario.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      contenido: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      eservicio_id: [0, Validators.required]
    });
    console.log('Formulario configurado:', this.theFormGroup);
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  loadServicios() {
    this.ejecucionservicioService.list().subscribe((response: any) => {
      console.log('Datos recibidos del servicio de ejecuciones:', response);
      if ('data' in response) {
        this.serviciosDisponibles = response['data'];
      } else {
        this.serviciosDisponibles = response;
      }
    });
  }

  getComentario(id: number) {
    console.log('Obteniendo comentario con id:', id);
    this.service.view(id).subscribe(
      data => {
        console.log('Datos del comentario:', data);
        if (data) {
          this.comentario = data;
          this.comentario.id = id;
          if (this.theFormGroup) {
            this.theFormGroup.patchValue({
              eservicio_id: this.comentario.eservicio_id,
              contenido: this.comentario.contenido
            });
          } else {
            console.error('El formulario no está inicializado.');
          }
        } else {
          console.error('No se recibieron datos válidos del servicio.');
        }
      },
      error => {
        console.error('Error al obtener el comentario:', error);
      }
    );
  }

  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene los campos correctamente", "error");
    } else {
      this.comentario.contenido = this.theFormGroup.get('contenido').value;
      this.comentario.eservicio_id = this.theFormGroup.get('eservicio_id').value;
      this.service.create(this.comentario).subscribe(data => {
        Swal.fire(
          'Creado!',
          'El Comentario ha sido creado correctamente',
          'success'
        );
        this.router.navigate(['comentarios/list']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene los campos correctamente", "error");
    } else {
      this.comentario.contenido = this.theFormGroup.get('contenido').value;
      this.comentario.eservicio_id = this.theFormGroup.get('eservicio_id').value;
      this.service.update(this.comentario).subscribe(data => {
        Swal.fire(
          'Actualizado!',
          'El Comentario ha sido actualizado correctamente',
          'success'
        );
        this.router.navigate(['comentarios/list']);
      });
    }
  }
}
