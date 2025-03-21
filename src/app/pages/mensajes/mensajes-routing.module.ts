import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path : 'list/:id',
    component : ListComponent
  },
  {
    path : 'create',
    component : ListComponent
  },
  {
    path : 'update/:id',
    component : ListComponent
  },
  {
    path : 'view/:id',
    component : ListComponent
  },
  {
    path : 'delete/:id',
    component : ListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MensajesRoutingModule { }
