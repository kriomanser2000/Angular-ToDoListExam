import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService 
{
  private tasks: Task[] = [
    { id: 1, title: 'іваптді', description: 'пупуукекурп', dueDate: new Date(), tags: ['1'], priority: 'medium', completed: false },
    { id: 2, title: 'івавіакцупу', description: 'асмипаоьагнр', dueDate: new Date(), tags: ['2'], priority: 'high', completed: false }
  ];
  getTasks(): Task[] 
  {
    return [...this.tasks];
  }
  addTask(title: string, description: string, dueDate: Date, tags: string[], priority: 'low' | 'medium' | 'high'): void 
  {
    const newTask: Task = 
    {
      id: this.tasks.length + 1,
      title,
      description,
      dueDate,
      tags,
      priority,
      completed: false
    };
    this.tasks.push(newTask);
  }
  toggleTask(id: number): void 
  {
    const task = this.tasks.find(task => task.id === id);
    if (task) 
    {
      task.completed = !task.completed;
    }
  }
  deleteTask(id: number): void 
  {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
  editTask(id: number, title: string, description: string, dueDate: Date, tags: string[], priority: 'low' | 'medium' | 'high'): void 
  {
    const task = this.tasks.find(task => task.id === id);
    if (task) 
    {
      task.title = title;
      task.description = description;
      task.dueDate = dueDate;
      task.tags = tags;
      task.priority = priority;
    }
  }
}