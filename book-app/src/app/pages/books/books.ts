import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface Book {
  id: number;
  title: string;
  author: string;
}

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books.html',
})
export class Books implements OnInit {
  books: Book[] = [];
  editBookId: number | null = null;
  editTitle = '';
  editAuthor = '';
  newTitle = '';
  newAuthor = '';
  apiUrl = environment.apiBaseUrl;
  username = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      alert('User not logged in!');
      return;
    }
    this.username = storedUsername;
    this.loadBooks();
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  startEdit(book: Book) {
    this.editBookId = book.id;
    this.editTitle = book.title;
    this.editAuthor = book.author;
  }

  cancelEdit() {
    this.editBookId = null;
    this.editTitle = '';
    this.editAuthor = '';
  }

  saveEdit(id: number) {
    const updatedBook: Book = { id, title: this.editTitle, author: this.editAuthor };
    const index = this.books.findIndex(b => b.id === id);
    if (index !== -1) {
      this.books[index] = updatedBook;
      this.saveBooksToLocalStorage();
      this.cancelEdit();
    }
  }

  deleteBook(id: number) {
    this.books = this.books.filter(b => b.id !== id);
    this.saveBooksToLocalStorage();
  }

  loadBooks() {
    const storedBooks = localStorage.getItem(`books_${this.username}`);
    this.books = storedBooks ? JSON.parse(storedBooks) : [];
  }

  addBook() {
    const newBook: Book = {
      id: this.books.length ? Math.max(...this.books.map(b => b.id)) + 1 : 1,
      title: this.newTitle,
      author: this.newAuthor,
    };
    this.books.push(newBook);
    this.saveBooksToLocalStorage();
    this.newTitle = '';
    this.newAuthor = '';
  }

  saveBooksToLocalStorage() {
    localStorage.setItem(`books_${this.username}`, JSON.stringify(this.books));
  }
}
