import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides, ToastController } from '@ionic/angular';
import { Task } from '../interfaces/Task'
import { DataService } from '../services/data.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import { UserProfile } from '../interfaces/User';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { GlobalService } from '../global.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-create-repair-task',
  templateUrl: './create-repair-task.page.html',
  styleUrls: ['./create-repair-task.page.scss'],
})
export class CreateRepairTaskPage {
  @ViewChild('slider') slider: IonSlides;

  // slide opties voor de slides voor vragen

  public slideOpts = {
    'allowTouchMove': false,
    'autoplay': false
  };

  // huidige gebruiker

  user = firebase.auth().currentUser;

  // lege taak aanmaken

  task: Task = {
    taskType: 'Reparatie',
    title: '',
    description: '',
    createdAt: new Date().getTime(),
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

  lastSlide: boolean
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private toastCtrl: ToastController,
    private router: Router,
    private authservice: AuthService,
    private afStore: AngularFirestore,
    private globalService: GlobalService,
    private alertController: AlertController

  ) { 

  this.lastSlide = false

  }

  // kijken of er een gebruiker is en als die dat is krijgt de createdBy de username van de huidige gebruiker

  ngOnInit() {
    if (this.user != null) {
      this.task.createdBy = this.user.displayName;
    }
  }

  ionViewWillEnter() {
    this.slider.slideTo(0);
  }


  // checken of het de laatste slide is

  slideChanged() {
    this.slider.isEnd().then((lastSlide) => {
      if (lastSlide) {
        console.log('Laatste slide')
        this.lastSlide = true;
      } else {
        this.lastSlide = false;
      }

    });
  }

  // volgende slide
  swipeNext() {
    this.slider.slideNext();
  }

  // vorige slide

  swipePrev() {
    this.slider.slidePrev();
  }

  // Taak toevoegen en navigeren naar Home

  addTask() {
    this.dataService.addTask(this.task).then(() => {
      this.router.navigateByUrl('/home');
    }, err => {
    });
  }

  async presentAlertConfirmAddTask() {
    console.log('alert');
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Taak toevoegen',
      message: 'Wil je deze taak toevoegen?',
      buttons: [
        {
          text: 'Annuleren',
          role: 'cancel',
          cssClass: 'warning',
          handler: () => {
            this.alertController.dismiss
          }
        }, {
          text: 'Toevoegen',
          handler: () => {
            this.addTask();
          }
        }
      ]
    });
    await alert.present();
  }
}

