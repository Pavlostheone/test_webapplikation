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

 import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-edit-book',
  templateUrl: './edit-book.html',
  imports: [CommonModule, FormsModule], 
})
export class EditBook {
  books: any[] = [];
  editBookId: number | null = null;
  editTitle = '';
  editAuthor = '';

  startEdit(book: any) {
    this.editBookId = book.id;
    this.editTitle = book.title;
    this.editAuthor = book.author;
  }

  saveEdit(id: number) {
    const book = this.books.find(b => b.id === id);
    if (book) {
      book.title = this.editTitle;
      book.author = this.editAuthor;
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.editBookId = null;
    this.editTitle = '';
    this.editAuthor = '';
  }

  deleteBook(id: number) {
    this.books = this.books.filter(b => b.id !== id);
  }
}
