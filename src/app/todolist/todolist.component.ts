import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {

  todoList: Todo[];
  newTask: Todo;
  isEditOpen: boolean;
  originalTask: Todo;
  editedTask: Todo;

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
    this.isEditOpen = true;
  }

  cancelEdit() {
    this.editedTask.description = this.originalTask.description;
    this.editedTask.dueDate = this.originalTask.dueDate;
    this.isEditOpen = false;
  }
  closeEdit() {
    this.isEditOpen = false;
  }

  saveTodoList() {
    localStorage.setItem('todolist', JSON.stringify(this.todoList));
  }
  getTodoList(): Todo[] | null {
    return JSON.parse(localStorage.getItem('todolist'));
  }

}
