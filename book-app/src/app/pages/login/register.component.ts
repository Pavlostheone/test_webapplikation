import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@app/auth.service';

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

    register() {
      this.auth.register({
        username: this.username,
        password: this.password
      }).subscribe({
        next: () => {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          this.router.navigate(['/login']);
        },
        error: () => {
          this.error = 'Registration failed';
        }
      });
}


}
