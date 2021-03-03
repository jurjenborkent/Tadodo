import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../interfaces/Task'
import { DataService } from '../services/data.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { GlobalService } from '../global.service'

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.page.html',
  styleUrls: ['./view-task.page.scss'],
})
export class ViewTaskPage implements OnInit {

  user = firebase.auth().currentUser

  task: Task = {
    taskType: '',
    id: '',
    title: '',
    description: '',
    createdAt: '',
    createdBy: '',
    assignedTo: '',
    costumerSurName: '',
    deadlineDay: '',
    deadlineTime: '',
    isCompleted: false,
    completedBy: '',

    deviceType: '',
    displayWorks: '',
    touchscreenWorks: '',
    cameraWorks: '',
    chargingWorks: '',
    fingerprintWorks: '',
    speakersWork: '',
    deviceStraight: '',
    deviceCase: '',
    deviceSimcard: '',
    devicePincode: '',
    placeScreenProtector: ''    
  };

  canComplete: boolean

  options = {
    message: `Er staat een nieuw taak klaar op Tadodo, titel: ${this.task.title}, Deadline: ${this.task.deadlineDay} om ${this.task.deadlineTime}. Deze taak is gemaakt door ${this.task.createdBy}. Je kunt deze taak bekijken op https://taakie-db237.web.app/view-task/` + this.task.id,
    chooserTitle: 'Selecteer een applicatie'
  }

  constructor(
    public alertController: AlertController,
    private activeRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private socialSharing: SocialSharing,
    private afStore: AngularFirestore,
    private authservice: AuthService,
    public platform: Platform,
    private globalService: GlobalService
  ) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if (id) {
      this.dataService.getTask(id).subscribe(taskData => {
        this.task = taskData;
        if (this.user.displayName === this.task.assignedTo) {
          this.canComplete = true
          console.log(this.canComplete);
        }
        else {
          this.canComplete = false
          console.log(this.canComplete);
        }
      });
    }
  }

  shareTask() {
    this.socialSharing.shareViaWhatsApp(`Er staat een nieuw taak klaar op Tadodo! Titel: ${this.task.title}, Deadline: ${this.task.deadlineDay} om ${this.task.deadlineTime}. Deze taak is gemaakt door ${this.task.createdBy}. Je kunt deze taak bekijken op https://taakie-db237.web.app/view-task/` + this.task.id);
    console.log(this.task.id);
    }
   

  deleteTask() {
    this.dataService.deleteTask(this.task.id).then(() => {
      this.router.navigateByUrl('/home');
    });
  }

  finishTask() {
    this.task.isCompleted = true;
    this.dataService.finishTask(this.task);
    this.router.navigateByUrl('/home');
    if (this.task.taskType === 'Reparatie') {
      this.globalService.repairTasksCount++;
      console.log(this.globalService.repairTasksCount);
    }
    console.log(this.task.isCompleted);
  }

  assignTask() {
    if (this.user != null) {
      this.task.assignedTo = this.user.displayName
      this.dataService.assignTask(this.task);
      this.router.navigateByUrl('/home');
    }
  }

  goToHomePage() {
    this.router.navigateByUrl('home');
  }


  async presentAlertConfirmAssignTask() {
    console.log('alert');
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Taak oppaken',
      message: 'Wil je deze taak oppakken?',
      buttons: [
        {
          text: 'Annuleren',
          role: 'cancel',
          cssClass: 'warning',
          handler: () => {
            this.alertController.dismiss
          }
        }, {
          text: 'Oppakken',
          handler: () => {
            this.assignTask();
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertConfirmCompleteTask() {
    console.log('alert');
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Taak afronden',
      message: 'Wil je deze taak afronden?',
      buttons: [
        {
          text: 'Annuleren',
          role: 'cancel',
          cssClass: 'warning',
          handler: () => {
            this.alertController.dismiss
          }
        }, {
          text: 'Afronden',
          handler: () => {
            this.finishTask();
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertConfirmDeleteTask() {
    console.log('alert');
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Taak verwijderen',
      message: 'Wil je deze taak verwijderen?',
      buttons: [
        {
          text: 'Annuleren',
          role: 'cancel',
          cssClass: 'warning',
          handler: () => {
            this.alertController.dismiss
          }
        }, {
          text: 'Verwijderen',
          handler: () => {
            this.deleteTask();
          }
        }
      ]
    });
    await alert.present();
  }
}
