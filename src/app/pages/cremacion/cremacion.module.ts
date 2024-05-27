import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CremacionRoutingModule } from './cremacion-routing.module';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    CremacionRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CremacionModule { }
