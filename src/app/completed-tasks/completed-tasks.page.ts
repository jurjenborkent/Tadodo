import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/Task';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.page.html',
  styleUrls: ['./completed-tasks.page.scss'],
})
export class CompletedTasksPage implements OnInit {

  private tasks: Observable<Task[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.tasks = this.dataService.getTasks();
  }

}
