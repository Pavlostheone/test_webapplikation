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
  books: any[] = []; // dummy data for now; replace with API later
  editBookId: number | null = null;
  editTitle = '';
  editAuthor = '';

  startEdit(book: any) {
    this.editBookId = book.id;
    this.editTitle = book.title;
    this.editAuthor = book.author;
  }

  saveEdit(id: number) {
    // You'd usually call an API here
    const book = this.books.find(b => b.id === id);
    if (book) {
      book.title = this.editTitle;
      book.author = this.editAuthor;
    }
    this.cancelEdit();
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
