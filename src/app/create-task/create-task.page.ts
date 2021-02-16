import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
})
export class CreateTaskPage implements OnInit {

  constructor(private router: Router) { }

  taskSelection = '';

  ngOnInit() {
  }

  // goToCreateRepairTask() {
  //   this.router.navigateByUrl('create-repair-task');
  // }

  goToCreateTaskPage() {
    if(this.taskSelection === '') {
      alert('Kies een categorie')
    }
    if (this.taskSelection === 'general') {
      this.router.navigateByUrl('create-general-task');
    }
    if (this.taskSelection === 'repair') {
      this.router.navigateByUrl('create-repair-task');
    }
  }
}
