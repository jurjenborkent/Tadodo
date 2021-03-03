import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './interfaces/Task';

@Pipe({
  name: 'isCompleted'
})
export class IsCompletedPipe implements PipeTransform {

  // Filter voor ngFor, taken laten zien die afgerond zijn

  transform(task: Task[], completedTask : Boolean) {
    if (!task) {
      return;
    }
    return task.filter(t => t.isCompleted === completedTask);
  }
}


