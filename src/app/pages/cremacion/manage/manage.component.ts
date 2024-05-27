import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cremacion } from 'src/app/models/funeraria/cremacion.model';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CremacionService } from 'src/app/services/funeraria/cremacion.service';

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

  constructor(
    private activateRoute: ActivatedRoute,
    private service: CremacionService,
    private theFormBuilder: FormBuilder,
    private router: Router

  ) { 
    this.trySend = false;
    this.mode = 1;
    this.cremacion={id:0, ubicacion:"", fecha_hora:null, servicio_id:0, sala_id:0}
  }
  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
      this.theFormGroup.get('ubicacion')?.disable();
      this.theFormGroup.get('fecha_hora')?.disable();
      this.theFormGroup.get('servicio_id')?.disable();
      this.theFormGroup.get('sala_id')?.disable();
      this.getCremacion(this.activateRoute.snapshot.params.id);
    }
    else if (currentUrl.includes('create')) {
      this.mode = 2;
    }
    else if (currentUrl.includes('update')) {
      this.mode = 3;
      this.getCremacion(this.activateRoute.snapshot.params.id);
    }
  }
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      ubicacion: ["", [Validators.required, Validators.min(1)]],
      fecha_hora: ["", [Validators.required]],
      servicio_id: [0, [Validators.required]],
      sala_id:[0,[Validators.required]]
    })
  }
  get getTheFormGroup() {
    return this.theFormGroup.controls
  }
  getCremacion(id: number) {
    this.service.view(id).subscribe(data => {
      this.cremacion = data
    });
  }
  create(){
    this.trySend = true;
    if (this.theFormGroup.invalid){
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    }else{
      this.service.create(this.cremacion).subscribe(data => {
        Swal.fire("Creado", "El servicio ha sido creado correctamente", "success");
        this.router.navigate(['cremaciones/list']);
      });
    }
  }
  update(){
    this.trySend = true;
    if (this.theFormGroup.invalid){
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    }else{
      this.activateRoute.snapshot.params.id;
      this.cremacion.id = this.activateRoute.snapshot.params.id;
      this.getCremacion(this.cremacion.id);
      this.service.update(this.cremacion).subscribe(data => {
        Swal.fire("Actualizado", "El servicio de cremacion ha sido actualizada correctamente", "success");
        this.router.navigate(['cremaciones/list']);
      });
    }
  }
}