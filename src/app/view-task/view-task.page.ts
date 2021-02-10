import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../interfaces/Task'
import { DataService } from '../services/data.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AuthService} from '../services/auth.service';
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
    assignedTo: ''
  };

  constructor(
    private activeRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private socialSharing: SocialSharing,
    private afStore: AngularFirestore,
    private authservice: AuthService
  ) 
  { }

  ngOnInit() {
  console.log("testting" , this.task)
  }
  
  ngAfterViewInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if (id) {
      this.dataService.getTask(id).subscribe(taskData => {
        this.task = taskData;
      });
    }
  }

  shareWhatsApp() {
    this.socialSharing.shareViaWhatsApp('Er staat een Toedoe voor je klaar op https://taakie-db237.web.app/view-task/' + this.task.id);
  }

  deleteTask() {
    this.dataService.deleteTask(this.task.id).then(() => {
      this.router.navigateByUrl('/home');
    });
  }

  assignTask(){
    if (this.user != null) {
      this.task.assignedTo = this.user.displayName
      this.dataService.assignTask(this.task);
    }
}
}
