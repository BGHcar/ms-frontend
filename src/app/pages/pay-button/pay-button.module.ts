import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayButtonRoutingModule } from './pay-button-routing.module';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    PayButtonRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PayButtonModule { }
