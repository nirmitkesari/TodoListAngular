import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-component.html',
  styleUrls: ['./card-component.css']
})
export class CardComponent implements OnInit {
  showPopPop = false;
  newTask = '';
  taskDate = '';
  deadline: string = '';
  selectedStatus: 'active' | 'completed' | 'hold' | 'pending' = 'active';
  CompletedTask = 0;
  totalTask = 0;
  isEditing = false;
  editingIndex: number | null = null;

  tasks: {
    name: string;
    status: 'active' | 'completed' | 'hold' | 'pending';
    date?: string;
    timerEnd?: number;
    createdAt: string;
  }[] = [];

  ngOnInit() {
    setInterval(() => this.checkTaskTimers(), 1000);
  }

  addTask() {
    const taskName = this.newTask.trim();
    if (taskName) {
      const currentTime = Date.now();
      const deadlineTimestamp = this.selectedStatus === 'active' && this.deadline
        ? new Date(this.deadline).getTime()
        : undefined;

      this.tasks.push({
        name: taskName,
        status: this.selectedStatus,
        date: this.taskDate,
        createdAt: new Date(currentTime).toISOString(),
        timerEnd: deadlineTimestamp
      });

      this.totalTask++;
      this.updateCompletedTaskCount();
      this.resetForm();
    }
  }

  updateTask() {
    if (this.editingIndex !== null) {
      const task = this.tasks[this.editingIndex];
      task.name = this.newTask;
      task.status = this.selectedStatus;
      task.date = this.taskDate;
      task.timerEnd = (this.selectedStatus === 'active' && this.deadline)
        ? new Date(this.deadline).getTime()
        : undefined;
      this.updateCompletedTaskCount();
      this.resetForm();
    }
  }

  cancelTask() {
    this.resetForm();
  }

  editTask(index: number) {
    const task = this.tasks[index];
    this.newTask = task.name;
    this.taskDate = task.date || '';
    this.deadline = task.timerEnd ? new Date(task.timerEnd).toISOString().slice(0, 16) : '';
    this.selectedStatus = task.status;
    this.showPopPop = true;
    this.isEditing = true;
    this.editingIndex = index;
  }

  toggleTaskCompletion(index: number) {
    const task = this.tasks[index];
    if (task.status === 'completed') {
      task.status = 'active';
      task.timerEnd = this.deadline ? new Date(this.deadline).getTime() : undefined;
    } else {
      task.status = 'completed';
      delete task.timerEnd;
    }
    this.updateCompletedTaskCount();
  }

  updateCompletedTaskCount() {
    this.CompletedTask = this.tasks.filter(t => t.status === 'completed').length;
  }

  resetForm() {
    this.newTask = '';
    this.taskDate = '';
    this.deadline = '';
    this.selectedStatus = 'active';
    this.isEditing = false;
    this.editingIndex = null;
    this.showPopPop = false;
  }

  checkTaskTimers() {
    const now = Date.now();
    for (const task of this.tasks) {
      if (task.status === 'active' && task.timerEnd && now >= task.timerEnd) {
        task.status = 'pending';
        delete task.timerEnd;
      }
    }
  }

  getRemainingTime(endTimestamp: number): string {
    const now = Date.now();
    let diff = endTimestamp - now;
    if (diff <= 0) return '00:00:00';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff %= 1000 * 60 * 60;
    const minutes = Math.floor(diff / (1000 * 60));
    diff %= 1000 * 60;
    const seconds = Math.floor(diff / 1000);

    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }

  showTaskDetails(task: any) {
    const message = `Task: ${task.name}\nAssigned On: ${new Date(task.createdAt).toLocaleString()}\nDue Date: ${task.date || 'N/A'}`;
    alert(message);
  }
}
