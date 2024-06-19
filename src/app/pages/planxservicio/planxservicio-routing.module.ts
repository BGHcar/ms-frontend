import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { RoleauthGuard } from 'src/app/guards/roleauth.guard';

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent,

  },
  {
    path: 'create',
    component: ManageComponent,
    canActivate:[RoleauthGuard]

  },
  {
    path: 'update/:id',
    component: ManageComponent,
    canActivate:[RoleauthGuard]

  },
  {
    path: 'view/:id',
    component: ManageComponent,

  },
  {
    path: 'delete/:id',
    component: ManageComponent,
    canActivate:[RoleauthGuard]

  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanxservicioRoutingModule { }
