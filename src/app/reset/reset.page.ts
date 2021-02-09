import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private alertcontroller: AlertController) { }

  ngOnInit() {
  }

  async resetPassword(form):Promise<void> {
    this.authService.resetPassword(form.value.email).
    then(
     async ()=> {
      const alert = await this.alertcontroller.create({
        message:'Er is een e-mail verstuurd voor het resetten van jouw wachtwoord',
        buttons:[{text:'ok',role:'cancel',handler:()=>{
          this.router.navigateByUrl('login')
        },},],
      });
      await alert.present();
      },
      async error => {
        const errorAlert = await this.alertcontroller.create({
          message:error.message,
          buttons:[{text:'ok',role:'cancel'}],
        });
        await errorAlert.present();
      }
    );
  }

}
