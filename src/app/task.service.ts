import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({ providedIn: 'root' })
export class TaskService 
{
  private tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
  getTasks(): Task[] 
  {
    return this.tasks;
  }
  addTask(title: string): void 
  {
    const newTask: Task = { id: Date.now(), title, completed: false };
    this.tasks.push(newTask);
    this.saveTasks();
  }
  toggleTask(id: number): void 
  {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.completed = !task.completed;
    this.saveTasks();
  }
  deleteTask(id: number): void 
  {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveTasks();
  }
  editTask(id: number, newTitle: string): void 
  {
    const task = this.tasks.find(t => t.id === id);
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
}