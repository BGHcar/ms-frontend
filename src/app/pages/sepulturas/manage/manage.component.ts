import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Sepultura } from 'src/app/models/funeraria/sepultura.model';
import { SepulturaService } from 'src/app/services/funeraria/sepultura.service';

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

  constructor(
    private activateRoute: ActivatedRoute,
    private service: SepulturaService,
    private theFormBuilder: FormBuilder,
    private router: Router

  ) { 
    this.trySend = false;
    this.mode = 1;
    this.sepultura={id:0, ubicacion:"", fecha_hora:"", servicio_id:0}
  }
  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
      this.theFormGroup.get('ubicacion')?.disable();
      this.theFormGroup.get('fecha_hora')?.disable();
      this.theFormGroup.get('servicio_id')?.disable();
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
      ubicacion: ["", [Validators.required, Validators.min(1)]],
      fecha_hora: ["", [Validators.required]],
      servicio_id: [0, [Validators.required]],
    })
  }
  get getTheFormGroup() {
    return this.theFormGroup.controls
  }
  getSepultura(id: number) {
    this.service.view(id).subscribe(
      data => {this.sepultura = data;
      });
  }
  create(){
    this.trySend = true;
    if (this.theFormGroup.invalid){
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    }else{
      this.service.create(this.sepultura).subscribe(data => {
        this.sepultura.fecha_hora = this.sepultura.fecha_hora;
        this.sepultura.ubicacion = this.sepultura.ubicacion;
        this.sepultura.servicio_id = this.sepultura.servicio_id;
        this.sepultura.id = this.sepultura.id;
        Swal.fire("Creado", "El servicio ha sido creado correctamente", "success");
        this.router.navigate(['sepulturas/list']);
      });
    }
  }
  update(){
    this.trySend = true;
    if (this.theFormGroup.invalid){
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    }else{
      this.activateRoute.snapshot.params.id;
      this.sepultura.id = this.activateRoute.snapshot.params.id;
      this.getSepultura(this.sepultura.id);
      this.service.update(this.sepultura).subscribe(data => {
        Swal.fire("Actualizado", "El servicio de cremacion ha sido actualizada correctamente", "success");
        this.router.navigate(['sepulturas/list']);
      });
    }
  }
}