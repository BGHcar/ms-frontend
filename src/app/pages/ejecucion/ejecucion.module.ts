import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EjecucionRoutingModule } from './ejecucion-routing.module';

@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    EjecucionRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EjecucionModule { }
