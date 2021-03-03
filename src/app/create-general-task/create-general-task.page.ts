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
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-create-general-task',
  templateUrl: './create-general-task.page.html',
  styleUrls: ['./create-general-task.page.scss'],
})
export class CreateGeneralTaskPage implements OnInit {
  @ViewChild('slider') slider: IonSlides;

  public slideOpts = {
    'allowTouchMove': false,
    'autoplay': false
  };

  // huidige gebruiker

  user = firebase.auth().currentUser;

  // lege taak aanmaken

  task: Task = {
    taskType: 'Algemeen',
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
  };

  lastSlide: boolean

  

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private toastCtrl: ToastController,
    private router: Router,
    private authservice: AuthService,
    private afStore: AngularFirestore,
    private alertController: AlertController

  ) {

    this.lastSlide = false

  }

  ngOnInit() {
    if (this.user != null) {
      this.task.createdBy = this.user.displayName;
    }
  }

  // slider naar eerste slide zetten zodra de view er is

  ionViewWillEnter() {
    this.slider.slideTo(0);
  }


  // checken of het de laatste slide is

  slideChanged() {
    this.slider.isEnd().then((lastSlide) => {
      console.log('Laatste slide')
      if (lastSlide) {
        // this.addTask()
        this.lastSlide = true;
      }
      else {
        this.lastSlide = false
      }
    });
  }

  swipeNext() {
    this.slider.slideNext();
  }

  swipePrev() {
    this.slider.slidePrev();
  }


  // firebase.auth().onAuthStateChanged( user => {
  //   console.log(user);

  //   if(user) {
  //    const result = this.afStore.doc(`/profile/${this.authservice.getUserUid()}`);
  //    var userProfile = result.valueChanges();
  //    userProfile.subscribe( profile =>{
  //      console.log(profile);
  //      this.task.createdBy = profile['name'];
  //    })
  //   }
  // })

  
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
