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


@Component({
  selector: 'app-create-repair-task',
  templateUrl: './create-repair-task.page.html',
  styleUrls: ['./create-repair-task.page.scss'],
})
export class CreateRepairTaskPage {
  @ViewChild('slider') slider: IonSlides;

  public slideOpts = {
    'allowTouchMove': false,
    'autoplay': false
  };

  user = firebase.auth().currentUser;

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
    private globalService: GlobalService

  ) { 

  this.lastSlide = false

  }

  ngOnInit() {
    if (this.user != null) {
      this.task.createdBy = this.user.displayName;
    }
  }

  ionViewWillEnter() {
    this.slider.slideTo(0);
  }


  slideChanged() {
    this.slider.isEnd().then((lastSlide) => {
      console.log('Laatste slide')
      if (lastSlide) {
        this.lastSlide = true;
      } else {
        this.lastSlide = false;
      }

    });
  }

  swipeNext() {
    this.slider.slideNext();
  }

  swipePrev() {
    this.slider.slidePrev();
  }

  addTask() {
    this.dataService.addTask(this.task).then(() => {
      this.router.navigateByUrl('/home');
    }, err => {
    });
  }

}

