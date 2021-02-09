import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
})
export class CreateTaskPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToCreateRepairTask() {
    this.router.navigateByUrl('create-repair-task');
  }

  goToCreateGeneralTaskPage() {
    this.router.navigateByUrl('create-general-task');
  }

}
