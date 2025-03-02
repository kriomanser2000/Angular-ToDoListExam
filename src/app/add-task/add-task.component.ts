import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  imports: [CommonModule, FormsModule]
})
export class AddTaskComponent 
{
  newTaskTitle: string = '';
  constructor(private taskService: TaskService) {}
  addTask(): void 
  {
    if (this.newTaskTitle.trim()) 
    {
      this.taskService.addTask(this.newTaskTitle.trim());
      this.newTaskTitle = '';
    }
  }
}