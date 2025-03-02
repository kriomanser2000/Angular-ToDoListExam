import { Component } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent 
{
  title: string = '';
  description: string = '';
  dueDate: string = '';
  tags: string = '';
  priority: 'low' | 'medium' | 'high' = 'medium';
  constructor(private taskService: TaskService) {}
  addTask(): void 
  {
    if (this.title.trim()) 
    {
      this.taskService.addTask(this.title, this.description, new Date(this.dueDate), this.tags.split(','), this.priority);
      this.title = '';
      this.description = '';
      this.dueDate = '';
      this.tags = '';
      this.priority = 'medium';
    }
  }
}