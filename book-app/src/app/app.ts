import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    CommonModule,
    RouterModule,  // ✅ correct: router + routes
  ],

})
export class AppComponent {
  toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');

    // Save preference
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  ngOnInit() {
    // Load preference on app start
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }
}
