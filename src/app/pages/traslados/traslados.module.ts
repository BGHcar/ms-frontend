import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TrasladosRoutingModule } from './traslados-routing.module';

@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    TrasladosRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TrasladosModule { }
