import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
  
  user = firebase.auth().currentUser;

  task: Task = {
    title: '',
    description: '',
    createdAt: new Date().getTime(),
    createdBy: '',
    assignedTo: '',
    costumerSurName: '',
    deadlineDay: '',
    deadlineTime: ''
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private toastCtrl: ToastController,
    private router: Router,
    private authservice: AuthService,
    private afStore: AngularFirestore

  ) { }

  ngOnInit() {


    if (this.user != null ) {
      this.task.createdBy = this.user.displayName;
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
  }

  addTask() {
    this.dataService.addTask(this.task).then(() => {
      this.router.navigateByUrl('/home');
    }, err => {
    });
  }

}
