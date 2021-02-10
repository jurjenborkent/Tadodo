import { Component, OnInit } from '@angular/core';
import { Profile } from '../interfaces/Profile';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  profileName: string;
  profileEmail: string;
  
  constructor(private afStore: AngularFirestore, private authservice: AuthService) { }

  ngOnInit() {


    var user = firebase.auth().currentUser;
    if (user != null) {
      this.profileName = user.displayName
      this.profileEmail = user.email
    }


    // firebase.auth().onAuthStateChanged( user => {
    //   console.log(user);

    //   if(user) {
    //    const result = this.afStore.doc(`/profile/${this.authservice.getUserUid()}`);
    //    var userProfile = result.valueChanges();
    //    userProfile.subscribe( profile =>{
    //      console.log(profile);
    //      this.profileName = profile['name'];
    //      this.profileEmail = profile['email'];
    //    })
    //   }
    // })
  }

  

}
