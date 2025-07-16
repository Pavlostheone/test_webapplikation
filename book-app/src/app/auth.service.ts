import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, credentials)
      .subscribe({
        next: (res) => {
          this.setToken(res.token);
          this.router.navigate(['/books']);
        },
        error: (err) => {
          alert(err.error);
        }
      });
  }

  register(credentials: { username: string; password: string }) {
  return this.http.post(`${this.apiUrl}/auth/register`, credentials);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded?.unique_name || decoded?.name || null;
    } catch (e) {
      return null;
    }
  }
}
