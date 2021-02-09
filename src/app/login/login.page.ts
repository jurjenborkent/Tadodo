import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private firestore: AngularFirestore, 
    private router:Router, private alertcontroller: AlertController, private nav: NavController){ }

  ngOnInit() {
  }

  async loginUser(form):Promise<void> {
    this.authService.loginUser(form.value.email, form.value.password).
    then(
      ( resp )=> {
        console.log(resp);

          this.authService.setUser({
            username: resp.user.displayName,
            uid: resp.user.uid
          })
  
          if(resp.user) {

          console.log(resp.user.uid);
          const userProfile = this.firestore.collection('profile').doc(resp.user.uid);

          userProfile.get().subscribe( result => {
            if(result.exists) {
              this.router.navigateByUrl('home');
            } else {
              this.firestore.doc(`profile/${this.authService.getUserUid()}`).set({
                name:  resp.user.displayName,
                email: resp.user.email,
              });
            }
          })
        }
        this.router.navigateByUrl('home');
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

navigateToSignUp(){
  this.router.navigateByUrl('signup');
}

navigateToReset(){
  this.router.navigateByUrl('reset');
}

}
