import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-component',
  imports: [CommonModule,FormsModule],
  templateUrl: './card-component.html',
  styleUrl: './card-component.css'
})
export class CardComponent {
  showPopPop = false;
  newTask = '';
  CompletedTask = 0;
  totalTask = 0;

  tasks: { name: string; completed: boolean }[] = [];

  addTask() {
    const taskName = this.newTask.trim();
    if (taskName) {
      this.tasks.push({ name: taskName, completed: false });
      this.totalTask++;
      this.newTask = '';
      this.showPopPop = false;
    }
  }

  toggleTaskCompletion(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.CompletedTask = this.tasks.filter(t => t.completed).length;
  }
}
