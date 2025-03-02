import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [CommonModule, FormsModule]
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
  }
  deleteTask(id: number): void 
  {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
  }
  saveEdit(task: Task): void 
  {
    task.editing = false;
    this.taskService.editTask(task.id, task.title);
  }
  setFilter(filter: string): void 
  {
    this.filter = filter;
  }
}