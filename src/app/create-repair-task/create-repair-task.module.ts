import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateRepairTaskPageRoutingModule } from './create-repair-task-routing.module';

import { CreateRepairTaskPage } from './create-repair-task.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FormsModule,
    CreateRepairTaskPageRoutingModule,
    RouterModule.forChild([
      {
      path: '',
      component: CreateRepairTaskPage
      }
    ])
  ],
  declarations: [CreateRepairTaskPage]
})
export class CreateRepairTaskPageModule {}
