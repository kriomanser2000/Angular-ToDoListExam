import { Injectable } from '@angular/core';
import { Task, Priority } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService 
{
  private tasks: Task[] = [];
  constructor() 
  {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) 
    {
      this.tasks = JSON.parse(savedTasks);
    }
  }
  getTasks(): Task[] 
  {
    return this.tasks;
  }
  addTask(title: string, description: string, priority: Priority, dueDate: string): void 
  {
    const newTask: Task = 
    {
      id: Date.now(),
      title,
      description,
      priority,
      dueDate,
      completed: false
    };
    this.tasks.push(newTask);
    this.saveTasks();
  }
  updateTask(id: number, title: string, description: string): void 
  {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, title, description } : task
    );
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
  deleteTask(id: number): void 
  {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();
  }
  private saveTasks(): void 
  {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}