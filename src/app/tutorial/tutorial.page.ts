import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  constructor(private storage: Storage) { }

  ngOnInit() {
  }

  test() {
    this.storage.set('hasSeenTutorial', true);
  }

}
