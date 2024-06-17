import { Component, OnInit } from '@angular/core';
import { MusicaService } from 'src/app/services/musica.service';
import { Musica } from 'src/app/models/musica.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tipo } from 'src/app/models/tipo.model';
import { TipoService } from 'src/app/services/tipo.service';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  musica: Musica;
  theFormGroup: FormGroup;
  trySend: boolean;
  tipos: Tipo[];

  constructor(
    private service: MusicaService,
    private theFormBuilder: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private tipoService: TipoService
  ) {
    this.trySend = false;
    this.musica = {
      id: 0,
      nombre: '',
      nombre_grupo: '',
      valor_hora: 0,
      tipo: {
        id: 0,
        nombre: ''
      }
    };
  }

  ngOnInit(): void {
    this.configFormGroup();
    this.tiposList();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [0],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      nombre_grupo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      valor_hora: [0, [Validators.required, Validators.min(1)]],
      tipo_id: [0, [Validators.required]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  tiposList() {
    this.tipoService.list().subscribe(data => {
      console.log(data["data"]);
      this.tipos = data;
    });
  }

  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      return;
    } else {
      this.service.create(this.theFormGroup.value).subscribe(data => {
        console.log(data);
        Swal.fire(
          'Creado',
          'Se ha creado correctamente',
          'success'
        );
        this.router.navigate(['musica/list']);
      });
    }
  }

}
