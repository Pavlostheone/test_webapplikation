// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Login } from './pages/login/login';
import { Books } from './pages/books/books';
import { Quotes } from './pages/quotes/quotes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      [
        { path: 'login', component: Login },
        { path: 'books', component: Books },
        { path: 'quotes', component: Quotes },
        { path: '', redirectTo: '/login', pathMatch: 'full' },
        { path: '**', redirectTo: '/login' },
      ],
      withComponentInputBinding()
    ),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};

