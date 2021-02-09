import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-repair-task',
  templateUrl: './create-repair-task.page.html',
  styleUrls: ['./create-repair-task.page.scss'],
})
export class CreateRepairTaskPage {
  
  @ViewChild('repairSlider') repairSlider;

	public slideOneForm: FormGroup;
	public slideTwoForm: FormGroup;

	public submitAttempt: boolean = false;

    constructor(public formBuilder: FormBuilder) {

    }

    next(){
        this.repairSlider.slideNext();
    }

    prev(){
        this.repairSlider.slidePrev();
    }

    save(){

    }
  
}
