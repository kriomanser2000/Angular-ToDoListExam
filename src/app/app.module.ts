import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    TaskListComponent,
    AddTaskComponent
  ],
})
export class AppModule {}
bootstrapApplication(AppComponent);