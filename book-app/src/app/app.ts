import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    CommonModule,
    RouterModule,  
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
  // Add a method to navigate to the login page
  constructor(private router: Router) {}
  isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
}

getUsername(): string | null {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload?.name || payload?.sub || null;
  } catch {
    return null;
  }
}

logout(): void {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}

goToLogin(): void {
  this.router.navigate(['/login']);
}

goToRegister(): void {
  this.router.navigate(['/register']);
}

}
