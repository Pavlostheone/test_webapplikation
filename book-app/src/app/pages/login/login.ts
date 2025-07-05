import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [CommonModule, FormsModule, RouterModule],
})
export class Login {
  username = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const body = { username: this.username, password: this.password };
    this.http.post<any>('http://localhost:5234/auth/login', body).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/books']);
      },
      error: () => alert('Invalid credentials'),
    });
  }
}
