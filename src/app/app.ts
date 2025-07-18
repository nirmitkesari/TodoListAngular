import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from "./card/card-component/card-component";
import { ChildComponent } from "./child/child-component/child-component";

@Component({
  selector: 'app-root',
  imports: [CardComponent, ChildComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AngularTodoList');
}
