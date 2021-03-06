import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import firebase from 'firebase/app'
import { firebaseConfig } from './firebase.config';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { NgZone } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private alertcontroller: AlertController,
    public afAuth: AngularFireAuth,
    private deeplinks: Deeplinks,
    private zone: NgZone
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.setupDeepLinks();
    firebase.initializeApp(firebaseConfig);
  }

  async logoutUser(form):Promise<void> {
    this.authService.logoutUser().
    then(
      ()=> {
        this.router.navigateByUrl('login');
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
    setupDeepLinks() {
      this.deeplinks.route({
        '/view-task/:id': 'view-task'
      }).subscribe(match => {
        console.log('Succesvol match', match);
        const internalPath = `/${match.$route}/${match.$args['id']}`;
        this.zone.run(() => {
          this.router.navigateByUrl(internalPath);
        })
      })
    }
  }
