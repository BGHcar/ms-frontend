import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from 'src/app/models/funeraria/chat.model';
import { ChatService } from 'src/app/services/funeraria/chat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1-> View, 2-> Create, 3-> Update
  chat: Chat; 
  theFormGroup: FormGroup;
  trySend: boolean;


  constructor(
    private activateRoute: ActivatedRoute,
    private service: ChatService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trySend = false;
    this.mode = 1;
    this.chat = { id: 0, eservicio_id:0,};
  }

  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id && this.mode !== 2) {
      this.chat.id = this.activateRoute.snapshot.params.id;
      this.getChat(this.chat.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      eservicio_id: [0, Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getChat(id: number) {
    this.service.view(id).subscribe(data => {
      this.chat = data;
      this.chat.id = id;
      this.theFormGroup.patchValue({
        eservicio_id: this.chat.eservicio_id
      });
    });
  }

  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene los campos correctamente", "error");
    } else {
      this.chat.eservicio_id = this.theFormGroup.get('eservicio_id').value;
      this.service.create(this.chat).subscribe(data => {
        Swal.fire(
          'Creado!',
          'El Chat ha sido creado correctamente',
          'success'
        );
        this.router.navigate(['chats/list']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene los campos correctamente", "error");
    } else {
      this.chat.eservicio_id = this.theFormGroup.get('eservicio_id').value;
      this.service.update(this.chat).subscribe(data => {
        Swal.fire(
          'Actualizado!',
          'El Chat ha sido actualizada correctamente',
          'success'
        );
        this.router.navigate(['chats/list']);
      });
    }
  }
}
