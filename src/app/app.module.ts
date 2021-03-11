import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore';  
import { AngularFireStorageModule } from '@angular/fire/storage';

import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { HttpClientModule } from '@angular/common/http';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IonicStorageModule } from '@ionic/storage';





@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [RouterModule ,BrowserModule, HttpClientModule, FormsModule, IonicModule.forRoot(), IonicStorageModule.forRoot(),  AppRoutingModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFirestoreModule, AngularFireStorageModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [
    StatusBar,
    SocialSharing,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Deeplinks,
    { provide: SETTINGS , useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
