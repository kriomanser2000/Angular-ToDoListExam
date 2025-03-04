import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Priority, Task } from '../task.model';
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
    let sortedTasks = [...this.tasks];
    if (this.filter === 'completed') 
    {
      sortedTasks = sortedTasks.filter(task => task.completed);
    } 
    else if (this.filter === 'pending') 
    {
      sortedTasks = sortedTasks.filter(task => !task.completed);
    }
    return sortedTasks.sort((a, b) => 
    {
      const priorityOrder: Record<Priority, number> = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
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