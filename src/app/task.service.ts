import { Injectable } from '@angular/core';
import { Task, Priority } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService 
{
  private storageKey = 'tasks';
  constructor() 
  {
    this.loadTasks();
  }
  private tasks: Task[] = [];
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
      completed: false,
      priority,
      dueDate
    };
    this.tasks.push(newTask);
    this.saveTasks();
  }
  toggleTask(id: number): void 
  {
    const task = this.tasks.find(t => t.id === id);
    if (task) 
    {
      task.completed = !task.completed;
      this.saveTasks();
    }
  }
  deleteTask(id: number): void 
  {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveTasks();
  }
  editTask(id: number, title: string, description: string, priority: Priority, dueDate: string): void 
  {
    const task = this.tasks.find(t => t.id === id);
    if (task) 
    {
      task.title = title;
      task.description = description;
      task.priority = priority;
      task.dueDate = dueDate;
      this.saveTasks();
    }
  }
  private saveTasks(): void 
  {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  }
  private loadTasks(): void 
  {
    const storedTasks = localStorage.getItem(this.storageKey);
    if (storedTasks) 
    {
      this.tasks = JSON.parse(storedTasks).map((task: any) => ({
        ...task,
        priority: this.validatePriority(task.priority)
      }));
    }
  }
  private validatePriority(priority: string): Priority 
  {
    const allowedPriorities: Priority[] = ["low", "medium", "high"];
    return allowedPriorities.includes(priority as Priority) ? (priority as Priority) : "low";
  }
}