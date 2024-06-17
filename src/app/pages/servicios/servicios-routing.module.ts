import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { RoleauthGuard } from 'src/app/guards/roleauth.guard';

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent,
    canActivate:[RoleauthGuard]

  },
  {
    path: 'create',
    component: ManageComponent
  },
  {
    path: 'update/:id',
    component: ManageComponent
  },
  {
    path: 'view/:id',
    component: ManageComponent
  },
  {
    path: 'delete/:id',
    component: ManageComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule { }
