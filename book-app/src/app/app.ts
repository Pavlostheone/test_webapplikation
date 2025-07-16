import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [CommonModule, RouterModule],
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router) {
    this.applySavedTheme();
  }

  public localStorage = localStorage;
  public window = window;
  /* ----------  THEME ---------- */
  toggleTheme(): void {
    const body = document.body;
    const isDark = body.classList.toggle('dark-theme');
    this.localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  private applySavedTheme(): void {
    const saved = this.localStorage.getItem('theme');
    if (saved === 'dark') document.body.classList.add('dark-theme');
  }

  /* ----------  AUTH ---------- */
  logout(): void           { this.auth.logout(); }
  goToLogin(): void        { this.router.navigate(['/login']); }
  goToRegister(): void     { this.router.navigate(['/register']); }
  getUsername(): string|null { return this.auth.getUsername(); }
}
  
