import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskModel } from '../models/taskModel';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Tasks } from '../models/tasks';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @ViewChild('taskName') task;
  @ViewChild('domainInput') domain;
  @ViewChild('descriptionInput') description;
  @ViewChild('estimatedInput') estimatedTime;
  
  taskModel: TaskModel;
  constructor(private firestore: AngularFirestore, private af: AngularFireAuth) {
    this.taskModel={
      "name": "",
      "domain": "",
      "description": "",
      "estimatedTime": "",
    }
   }

  ngOnInit(): void {
  }

  submit(){
    this.af.user.subscribe(user =>{
      let taskM: TaskModel={
        "name": this.task.value,
        "domain": this.domain.value,
        "description": this.description.value,
        "estimatedTime": this.estimatedTime.value,
      }
      return this.firestore.collection<Tasks>('tasks').add({
        task: taskM,
        uid: user.uid
      });

    })
    

  }
}
