import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  repairTasksCount: number

  constructor() { 
    this.repairTasksCount = 0;
    console.log(this.repairTasksCount);
  }

  ionViewDidEnter() {
    
  }
 

  // functie schrijven om dit getal in firebase op te slaan
}
