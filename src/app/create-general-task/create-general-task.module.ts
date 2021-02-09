import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateGeneralTaskPageRoutingModule } from './create-general-task-routing.module';

import { CreateGeneralTaskPage } from './create-general-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateGeneralTaskPageRoutingModule
  ],
  declarations: [CreateGeneralTaskPage]
})
export class CreateGeneralTaskPageModule {}
