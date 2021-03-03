import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service'

@Component({
  selector: 'app-target',
  templateUrl: './target.page.html',
  styleUrls: ['./target.page.scss'],
})
export class TargetPage implements OnInit {

  repairTarget: number

  constructor(private globalService: GlobalService) { }

  ionViewDidEnter() {
    this.repairTarget = this.globalService.repairTasksCount 
  } 
  
  ngOnInit(){}
  
}
