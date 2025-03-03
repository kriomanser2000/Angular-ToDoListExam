import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent
{
  tasks: Task[] = [];
  filter: string = 'all';
  constructor(private taskService: TaskService) 
  {
    this.tasks = this.taskService.getTasks();
  }
  get filteredTasks(): Task[] 
  {
    return this.filter === 'completed'
      ? this.tasks.filter(task => task.completed)
      : this.filter === 'pending'
      ? this.tasks.filter(task => !task.completed)
      : this.tasks;
  }
  toggleTask(id: number): void 
  {
    this.taskService.toggleTask(id);
  }
  deleteTask(id: number): void 
  {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
  }
  setFilter(filter: string): void 
  {
    this.filter = filter;
  }
}