import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletedTasksPageRoutingModule } from './completed-tasks-routing.module';

import { CompletedTasksPage } from './completed-tasks.page';
import { IsCompletedPipe } from '../is-completed.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletedTasksPageRoutingModule
  ],
  declarations: [CompletedTasksPage, IsCompletedPipe]
})
export class CompletedTasksPageModule {}
