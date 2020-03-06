import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from './edit-task/edit-task.component';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {

  todoList: Todo[];
  newTask: Todo;
  originalTask: Todo;
  editedTask: Todo;

  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {
    this.todoList = this.getTodoList() || [];
    this.newTask = new Todo();
    window.onbeforeunload = () => this.saveTodoList();
  }

  addTask() {
    if (!this.newTask.description) {
      return;
    }
    this.todoList.push(this.newTask);
    this.newTask = new Todo();
  }

  deleteTask(task: Todo) {
    const index = this.todoList.indexOf(task);
    this.todoList.splice(index, 1);
  }



  editTask(task: Todo) {
    this.originalTask = {...task};
    this.editedTask = task;

    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '250px',
      data: this.editedTask
    });

    dialogRef.afterClosed().subscribe((task: Todo) => {
      if (!task) {
        this.editedTask.description = this.originalTask.description;
        this.editedTask.dueDate = this.originalTask.dueDate;
      }
    });
  }


  saveTodoList() {
    localStorage.setItem('todolist', JSON.stringify(this.todoList));
  }
  getTodoList(): Todo[] | null {
    return JSON.parse(localStorage.getItem('todolist'));
  }

}
