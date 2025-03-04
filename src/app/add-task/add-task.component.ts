import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { Task, Priority } from '../task.model';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  imports: [FormsModule]
})
export class AddTaskComponent 
{
  newTaskTitle = '';
  newTaskDescription = '';
  newTaskPriority: Priority = 'medium';
  newTaskDueDate = '';
  constructor(private taskService: TaskService) {}
  addTask(): void 
  {
    if (!this.newTaskTitle.trim()) return;
    this.taskService.addTask(
      this.newTaskTitle,
      this.newTaskDescription,
      this.newTaskPriority,
      this.newTaskDueDate
    );
    this.newTaskTitle = '';
    this.newTaskDescription = '';
    this.newTaskPriority = 'medium';
    this.newTaskDueDate = '';
  }
}