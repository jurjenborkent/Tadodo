import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { Task } from '../interfaces/Task';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private tasks: Observable<Task[]>;


  constructor(private authService: AuthService, private dataService: DataService , private router: Router, private alertcontroller: AlertController) {}

  ngOnInit(): void {
    this.tasks = this.dataService.getTasks();
  }

  async logoutUser(form):Promise<void> {
    this.authService.logoutUser().
    then(
      ()=> {
        this.router.navigateByUrl('login');
      },
      async error => {
        const alert = await this.alertcontroller.create({
          message:error.message,
          buttons:[{text:'ok',role:'cancel'}],
        });
        await alert.present();
      }
    );
  }

  goToViewTaskPage() {
    this.router.navigateByUrl('view-task');
  }
  goToCreateTaskPage(){
    this.router.navigateByUrl('create-task');
  }

}
