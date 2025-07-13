import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '.../../../src/app/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  register(): void {
    this.auth.register({ username: this.username, password: this.password }).subscribe({
      next: () => this.router.navigate(['/quotes']),
      error: () => this.error = 'Registration failed. Try another username.'
    });
  }
}
