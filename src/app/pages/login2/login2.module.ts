import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Login2RoutingModule } from './login2-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    Login2RoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class Login2Module { }
