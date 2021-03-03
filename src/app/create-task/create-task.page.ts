import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
})
export class CreateTaskPage implements OnInit {

  constructor(private router: Router, public alertController: AlertController) { }

  taskSelection = '';

  ngOnInit() {
  }

  // goToCreateRepairTask() {
  //   this.router.navigateByUrl('create-repair-task');
  // }

  // ga naar specifieke pagina bij bepaalde selectie

  goToCreateTaskPage() {
    if(this.taskSelection === '') {
      alert('Kies een categorie');
    }
    if (this.taskSelection === 'general') {
      this.router.navigateByUrl('create-general-task');
    }
    if (this.taskSelection === 'repair') {
      this.router.navigateByUrl('create-repair-task');
    }
  }
}
