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

  user = firebase.auth().currentUser;

  task: Task = {
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
    imageUrl: ''
  };

  selectedImage: any

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private toastCtrl: ToastController,
    private router: Router,
    private authservice: AuthService,
    private afStore: AngularFirestore,

  ) {


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
      if (lastSlide) {
        this.addTask()
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

  chooseImage(event) {
    this.selectedImage = event.target.files
  }

  addTask() {
    this.dataService.addTask(this.task).then(async resp  => {

      this.task.imageUrl = await this.dataService.uploadImage(resp.id, this.selectedImage) 

      this.dataService.updateImage(this.task)

      this.router.navigateByUrl('/home');
    }, err => {
    });
  }


}
