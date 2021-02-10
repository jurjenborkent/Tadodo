import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/Task';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private tasks: Observable<Task[]>;
  private taskCollection: AngularFirestoreCollection<Task>;

  constructor(private afs: AngularFirestore) { 
    this.taskCollection = this.afs.collection<Task>('tasks')
    this.tasks = this.taskCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id , ...data };       
        });
      })
    );
  }

getTasks(): Observable<Task[]> {
  return this.tasks;
}

getTask(id: string): Observable<Task> {
  return this.taskCollection.doc<Task>(id).valueChanges().pipe(
    take(1),
    map(task => {
      task.id = id;
      return task;
    })
  );
}

addTask(task: Task): Promise<DocumentReference> {
  return this.taskCollection.add(task);
}

updateTask(task: Task): Promise<void> {
  return this.taskCollection.doc(task.id).update({ title: task.title, costumerSurName: task.costumerSurName, 
    deadlineDay: task.deadlineDay, deadlineTime: task.deadlineDay, description: task.description,});
}

assignTask(task: Task): Promise<void> {
  return this.taskCollection.doc(task.id).update({assignedTo: task.assignedTo});
}

deleteTask(id: string): Promise<void> {
  return this.taskCollection.doc(id).delete();
}

} 
