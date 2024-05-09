import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectorsRoutingModule } from './projectors-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    ProjectorsRoutingModule
  ]
})
export class ProjectorsModule { }
