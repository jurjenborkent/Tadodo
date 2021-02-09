import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateGeneralTaskPage } from './create-general-task.page';

const routes: Routes = [
  {
    path: '',
    component: CreateGeneralTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateGeneralTaskPageRoutingModule {}
