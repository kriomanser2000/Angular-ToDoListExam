import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent 
{
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  newTaskDueDate: string = '';
  newTaskPriority: 'low' | 'medium' | 'high' = 'medium';
  constructor(private taskService: TaskService) {}
  addTask(): void 
  {
    if (this.newTaskTitle.trim()) 
    {
      this.taskService.addTask(
        this.newTaskTitle,
        this.newTaskDescription,
        this.newTaskDueDate,
        this.newTaskPriority
      );
      this.newTaskTitle = '';
      this.newTaskDescription = '';
      this.newTaskDueDate = '';
      this.newTaskPriority = 'medium';
    }
  }
}