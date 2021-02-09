import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateRepairTaskPage } from './create-repair-task.page';

const routes: Routes = [
  {
    path: '',
    component: CreateRepairTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRepairTaskPageRoutingModule {}
