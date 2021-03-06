import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../app/interfaces/Task';

@Pipe({
  name: 'assignedTo'
})
export class AssignedToPipe implements PipeTransform {

  // filter voor Ngfor zodat alleen de taken zichtbaar zijn die opgepakt zijn

  transform(task: Task[], isAssignedTo: Boolean) {
    if (!task) {
      return;
    }
    return task.filter(t => !!t.assignedTo === isAssignedTo)
  }
}

