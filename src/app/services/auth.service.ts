import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { stringify } from 'querystring';
import { UserProfile } from '../interfaces/User'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: UserProfile
  
  constructor() { }

  loginUser(email: string, password: string):Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email,password);
  }
  signUpUser(email: string, password: string):Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email,password)
  }
  resetPassword(email: string):Promise<void>{
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser():Promise<void> {
    return firebase.auth().signOut();
  } 

  setUser(user: UserProfile) {
    return this.user = user;
  }

  getUserUid(): string {
    // console.log(this.user.uid);
    return this.user.uid;
  }


}
