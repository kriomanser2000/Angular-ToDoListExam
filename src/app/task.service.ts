import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService 
{
  private tasks: Task[] = [];
  constructor() 
  {
    this.loadTasks();
  }
  getTasks(): Task[] 
  {
    return this.tasks;
  }
  addTask(title: string): void 
  {
    const newTask: Task = 
    {
      id: Date.now(),
      title,
      completed: false,
      editing: false
    };
    this.tasks.push(newTask);
    this.saveTasks();
  }
  deleteTask(id: number): void 
  {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();
  }
  toggleTask(id: number): void 
  {
    const task = this.tasks.find(task => task.id === id);
    if (task) 
    {
      task.completed = !task.completed;
      this.saveTasks();
    }
  }
  editTask(id: number, newTitle: string): void 
  {
    const task = this.tasks.find(task => task.id === id);
    if (task) 
    {
      task.title = newTitle;
      this.saveTasks();
    }
  }
  private saveTasks(): void 
  {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  private loadTasks(): void 
  {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) 
    {
      this.tasks = JSON.parse(storedTasks);
    }
  }
}