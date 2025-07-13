import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Quotes } from './pages/quotes/quotes';
import { Books } from './pages/books/books';
import { RegisterComponent } from './pages/login/register.component'; // Adjust path if needed


export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'quotes', component: Quotes },
  { path: 'books', component: Books },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
