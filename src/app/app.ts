import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppPlaceholderComponent } from './app-placeholder.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppPlaceholderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-shop');
}
