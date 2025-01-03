import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'task-manager';
  taskControl = new FormControl('');

  taskForm = new FormGroup({
    task: new FormControl(''),
  });

  tasks: string[] = []; // Array to hold tasks

  ngOnInit() {
    // Retrieve the tasks from local storage and set them to the tasks array
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  submitApplication() {
    const taskValue = this.taskForm.value.task?.trim();

    if (taskValue != '' && taskValue != undefined) {
      // console.log(`Task submitted: ${taskValue}`);
      // Add the new task to the tasks array
      this.tasks.push(taskValue);

      // Save the updated tasks array to local storage
      localStorage.setItem('tasks', JSON.stringify(this.tasks));

      // Clear the input field after submission
      this.taskForm.reset(); // This will reset all controls in the form
      // or you can use this.taskForm.get('task').setValue(''); to clear only the task control
    }
  }

  deleteTask(index: number) {
    // Remove the task from the array
    this.tasks.splice(index, 1);
    // Update local storage
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
