import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-book.html',
  styleUrl: './edit-book.scss'
})
export class EditBook implements OnInit {
  books: any[] = [];
  editBookId: number | null = null;
  editTitle = '';
  editAuthor = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadBooks();
  }

  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  loadBooks() {
    this.http
      .get<any[]>('http://localhost:5234/books', this.getAuthHeaders())
      .subscribe(
        (data) => (this.books = data),
        () => alert('Failed to load books')
      );
  }

  startEdit(book: any) {
    this.editBookId = book.id;
    this.editTitle = book.title;
    this.editAuthor = book.author;
  }

  saveEdit(id: number) {
    const updatedBook = { title: this.editTitle, author: this.editAuthor };
    this.http
      .put(`http://localhost:5234/books/${id}`, updatedBook, this.getAuthHeaders())
      .subscribe(() => {
        this.editBookId = null;
        this.loadBooks();
      });
  }

  cancelEdit() {
    this.editBookId = null;
  }

  deleteBook(id: number) {
    this.http
      .delete(`http://localhost:5234/books/${id}`, this.getAuthHeaders())
      .subscribe({
        next: () => this.loadBooks(),
        error: () => alert('Failed to delete book'),
      });
  }
}
