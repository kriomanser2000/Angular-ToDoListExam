import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [NgFor, NgIf, FormsModule]
})
export class TaskListComponent 
{
  tasks: Task[] = [];
  filter: string = 'all';
  editTaskId: number | null = null;
  editTitle: string = '';
  editDescription: string = '';
  constructor(private taskService: TaskService) 
  {
    this.loadTasks();
  }
  loadTasks(): void 
  {
    this.tasks = this.taskService.getTasks().map(task => ({
      ...task,
      showDescription: task.showDescription ?? false
    }));
  }
  get filteredTasks(): Task[] 
  {
    let sortedTasks = this.tasks.map(task => ({ ...task }));
    if (this.filter === 'completed') 
    {
      sortedTasks = sortedTasks.filter(task => task.completed);
    } 
    else if (this.filter === 'pending') 
    {
      sortedTasks = sortedTasks.filter(task => !task.completed);
    }
    const priorityOrder: Record<string, number> = { high: 3, medium: 2, low: 1 };
    return sortedTasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
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
  startEditing(task: Task): void 
  {
    console.log('Editing started:', task);
    this.editTaskId = task.id;
    this.editTitle = task.title;
    this.editDescription = task.description;
  }
  saveTask(id: number): void 
  {
    if (!this.editTitle.trim()) return;
    console.log('Saving:', id);
    this.taskService.updateTask(id, this.editTitle, this.editDescription);
    this.tasks = this.tasks.map(task =>
      task.id === id
        ? { ...task, title: this.editTitle, description: this.editDescription }
        : task
    );
    this.editTaskId = null;
  }
}