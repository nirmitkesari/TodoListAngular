import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-child-component',
  imports: [CommonModule,FormsModule],
  templateUrl: './child-component.html',
  styleUrl: './child-component.css'
})
export class ChildComponent {


  courseName: String = "Child";
  title: String = 'Angular Practice';
  username: String = 'AngularUser';
  isLoggedIn = true;
  inputText = '';
  isHighlighted = false;
  bgColor: String = 'lightblue';
}
