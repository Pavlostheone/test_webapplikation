import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  register(credentials: { username: string; password: string }) {
  return this.http.post<{ token: string }>(`${this.apiUrl}/auth/register`, credentials).pipe(
    tap(response => {
      this.setToken(response.token);
    })
  );
  }

  logout() {
    return this.http.post(`${this.apiUrl}/auth/logout`, {}).subscribe(() => {
      localStorage.removeItem('token');
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
