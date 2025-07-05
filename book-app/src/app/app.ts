import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/books">BookApp</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link" routerLink="/books">Books</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/quotes">Quotes</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/login">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `,
  imports: [CommonModule, RouterModule],
})
export class App {}
