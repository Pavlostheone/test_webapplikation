import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-books',
  templateUrl: './books.html',
  imports: [CommonModule, FormsModule],
})
export class Books implements OnInit {
  books: any[] = [];
  newBookTitle = '';
  newBookAuthor = '';
  showAddForm = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadBooks();
  }

  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  loadBooks() {
    this.http.get<any[]>('http://localhost:5234/books', this.getAuthHeaders()).subscribe(
      (data) => (this.books = data),
      () => alert('Failed to load books')
    );
  }

  addBook() {
    const newBook = { title: this.newBookTitle, author: this.newBookAuthor };
    this.http.post('http://localhost:5234/books', newBook, this.getAuthHeaders()).subscribe(() => {
      this.newBookTitle = '';
      this.newBookAuthor = '';
      this.showAddForm = false;
      this.loadBooks();
    });
  }
  deleteBook(id: number) {
  this.http.delete(`http://localhost:5234/books/${id}`, this.getAuthHeaders()).subscribe({
    next: () => this.loadBooks(),
    error: () => alert('Failed to delete book'),
  });
  }
}