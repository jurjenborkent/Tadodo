import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../interfaces/Task'
import { DataService } from '../services/data.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.page.html',
  styleUrls: ['./view-task.page.scss'],
})
export class ViewTaskPage implements OnInit {

  user = firebase.auth().currentUser

  task: Task = {
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
    completedBy: ''
  };

  canComplete: boolean

  options = {
    message: 'Er staat een Toedoe voor je klaar op https://taakie-db237.web.app/view-task/' + this.task.id,
    chooserTitle: 'Selecteer een applicatie'
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private socialSharing: SocialSharing,
    private afStore: AngularFirestore,
    private authservice: AuthService
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
    this.socialSharing.shareViaWhatsApp('Er staat een Toedoe voor je klaar! Je kunt deze bekijken op: https://taakie-db237.web.app/view-task/' + this.task.id);
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
    console.log(this.task.isCompleted);
  }

  assignTask() {
    if (this.user != null) {
      this.task.assignedTo = this.user.displayName
      this.dataService.assignTask(this.task);
    }
  }

}
