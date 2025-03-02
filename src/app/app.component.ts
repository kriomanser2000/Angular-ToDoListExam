import { Component } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [TaskListComponent, AddTaskComponent]
})
export class AppComponent {}