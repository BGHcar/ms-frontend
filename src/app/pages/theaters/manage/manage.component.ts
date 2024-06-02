import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Projector } from 'src/app/models/projector.model';
import { Theater } from 'src/app/models/theater.model';
import { ProjectorService } from 'src/app/services/projector.service';
import { TheaterService } from 'src/app/services/theater.service';
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
  theater: Theater;
  theFormGroup: FormGroup;
  trySend: boolean;
  projectors: Projector[];

  constructor(private activateRoute: ActivatedRoute,
    private service: TheaterService,
    private router: Router,
    private theFormBuilder: FormBuilder,
    private projectorservices: ProjectorService,

  ) {
    this.projectors = []
    this.trySend = false;
    this.mode = 1;
    this.theater = { id: 0, capacity: 0, location: '', projector:{id:0, brand:"", width:0, high:0} }
  }
  loadProjector() {
    this.projectorservices.list().subscribe(data => {
      this.projectors = data;
    });
  }
  ngOnInit(): void {
    this.loadProjector();

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
      this.theater.id = this.activateRoute.snapshot.params.id;
      this.getTheater(this.theater.id);
      console.log("teatro: " + JSON.stringify(this.theater));
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      capacity: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
      location: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      projector: [null] // Añadir el control para sepultura

    })
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls
  }
  // getTheaterData(){
  //   this.theater.capacity=this.getTheFormGroup.capacity.value
  //   this.theater.location=this.getTheFormGroup.location.value
  // }

  getTheater(id: number) {
    this.service.view(id).subscribe(data => {
      this.theater = data
    })
  }

  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene los campos correctamente", "error")
    }else{
    this.service.create(this.theater).subscribe(data => {
      Swal.fire(
        'Creado!',
        'El teatro ha sido creado correctamente',
        'success'
      )
      this.router.navigate(['theaters/list']);

    })
    }
  }

  update() {

    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene los campos correctamente", "error")
    }else{
    this.activateRoute.snapshot.params.id;
    this.theater.id = this.activateRoute.snapshot.params.id;
    this.getTheater(this.theater.id);

    this.service.update(this.theater).subscribe(data => {



      Swal.fire(
        'Actualizado!',
        'El teatro ha sido actualizado correctamente',
        'success'
      )
      this.router.navigate(['theaters/list']);
    })
  }
}

}
