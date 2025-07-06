import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
};
