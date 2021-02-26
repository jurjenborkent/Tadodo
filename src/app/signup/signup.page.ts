import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { UserProfile } from '../interfaces/User';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  selectedFile: any;


  constructor(private authService: AuthService, private router: Router, private alertcontroller: AlertController) { 
  }
  ngOnInit() {
  }

  async signUpUser(form):Promise<void> {
    this.authService.signUpUser(form.value.email, form.value.password).
    then( response => {
      if(response.user){
        response.user.updateProfile({
          displayName: form.value.username,
          email: form.value.email,
        });
        this.router.navigateByUrl('login');
      }
      },
      async error => {
        const alert = await this.alertcontroller.create({
          message:error.message,
          buttons:[{text:'ok',role:'cancel'}],
        });
        await alert.present();
      }
    );
  }

  uploadImageToFirebase(event) {
    const file = event.target.files;
    console.log(file);
  }

}
