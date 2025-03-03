import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService 
{
  private tasks: Task[] = [];
  private idCounter: number = 1;
  getTasks(): Task[]
  {
    return [...this.tasks];
  }
  addTask(title: string, description: string, dueDate: string, priority: 'low' | 'medium' | 'high'): void 
  {
    this.tasks.push({
      id: this.idCounter++,
      title,
      description,
      dueDate,
      priority,
      completed: false
    });
  }
  toggleTask(id: number): void 
  {
    const task = this.tasks.find(t => t.id === id);
    if (task) 
    {
      task.completed = !task.completed;
    }
  }
  deleteTask(id: number): void 
  {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
}