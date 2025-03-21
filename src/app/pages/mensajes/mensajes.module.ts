import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MensajesRoutingModule } from './mensajes-routing.module';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    
  ],
  imports: [
    CommonModule,
    MensajesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MensajesModule { }
