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
  books: Book[] = [
    { id: 1, title: 'Example Book 1', author: 'Author 1' },
    { id: 2, title: 'Example Book 2', author: 'Author 2' },
  ];
  editBookId: number | null = null;
  editTitle = '';
  editAuthor = '';
  newTitle = '';
  newAuthor = '';
  apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
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
    this.http.put(`${this.apiUrl}/books/${id}`, updatedBook, { headers: this.getAuthHeaders() })
      .subscribe({
        next: () => {
          const book = this.books.find(b => b.id === id);
          if (book) {
            book.title = this.editTitle;
            book.author = this.editAuthor;
          }
          this.cancelEdit();
        },
        error: () => alert('Failed to update book.'),
      });
  }


  deleteBook(id: number) {
    this.books = this.books.filter(b => b.id !== id);
    this.saveBooksToLocalStorage();

  }

  loadBooks() {
    const storedBooks = this.getBooksFromLocalStorage();
    if (storedBooks.length) {
      this.books = storedBooks; // load saved state with examples or user-added books
    } else {
      this.books = [
        { id: 1, title: 'Example Book 1', author: 'Author 1' },
        { id: 2, title: 'Example Book 2', author: 'Author 2' },
      ];
      this.saveBooksToLocalStorage(); // save examples so they persist next time
    }

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
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  getBooksFromLocalStorage(): Book[] {
    const stored = localStorage.getItem('books');
    return stored ? JSON.parse(stored) : this.books; // fallback to examples
  }

}
