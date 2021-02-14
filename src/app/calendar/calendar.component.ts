import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Tasks } from '../models/tasks';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  $tasks;
  timeLeft: number;
  totalTime: number[];
  interval;

  constructor(private firestore: AngularFirestore) { 
    this.$tasks = this.firestore.collection<Tasks>('/tasks', ref => ref.where('uid', '==', firebase.default.auth().currentUser.uid)).snapshotChanges().pipe(
      map(documentChanges => {
        let tasks: Tasks[] = [];
        for(let change of documentChanges){
          let task: Tasks;
          task = change.payload.doc.data() as Tasks;
          tasks.push(task);
        }
        return tasks;
      })
    )
  }
  startTimer(){
    for(let t of this.$tasks)
    {
      if(Number(t.task.estimatedTime) == 2)
        this.timeLeft = 2;
      if(Number(t.task.estimatedTime) == 24)
        this.timeLeft = 24;
      if(Number(t.task.estimatedTime) == 168)
        this.timeLeft = 168;
    }
    this.interval.setInterval(() => {
      if(this.timeLeft > 0)
        this.timeLeft--;
      else
        this.timeLeft = 0;
    }, 1000
    
    )
  }
  ngOnInit(): void {
    
  }

}
