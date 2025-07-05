import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root'})
export class AuthService{
  private apiUrl = "https://localhost:2424";
  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { username: string, password: string }) {
    // The backend AuthController expects requests at /auth/login
    // rather than /login, so adjust the path accordingly.
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {}).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);

    }
  getToken(): string | null {
    return localStorage.getItem('token');

  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}