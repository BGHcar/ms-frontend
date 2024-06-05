import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComentariosRoutingModule } from './comentarios-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent,
    
  ],
  imports: [
    CommonModule,
    ComentariosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComentariosModule { }
