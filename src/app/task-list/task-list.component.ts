import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [NgFor, NgIf]
})
export class TaskListComponent implements OnInit
{
  ngOnInit(): void 
  {
    this.loadTasks();
  }
  tasks: Task[] = [];
  filter: string = 'all';
  constructor(private taskService: TaskService) 
  {
    this.loadTasks();
  }
  loadTasks(): void 
  {
    this.tasks = this.taskService.getTasks().map(task => ({ ...task, showDescription: false }));
  }
  get filteredTasks(): Task[] 
  {
    if (this.filter === 'completed')
    {
      return this.tasks.filter(task => task.completed);
    } 
    else if (this.filter === 'pending') 
    {
      return this.tasks.filter(task => !task.completed);
    }
    return this.tasks;
  }
  toggleTask(id: number): void 
  {
    this.taskService.toggleTask(id);
    this.loadTasks();
  }
  deleteTask(id: number): void 
  {
    this.taskService.deleteTask(id);
    this.loadTasks();
  }
  toggleDescription(id: number): void 
  {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, showDescription: !task.showDescription } : task
    );
  }
}