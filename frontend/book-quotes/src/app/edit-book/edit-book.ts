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
<<<<<<< HEAD
  books: any[] = []; // dummy data for now; replace with API later
=======
  books: any[] = [];
>>>>>>> be4d3bb19e94d7b0683149a2de55657b6d482512
  editBookId: number | null = null;
  editTitle = '';
  editAuthor = '';

  startEdit(book: any) {
    this.editBookId = book.id;
    this.editTitle = book.title;
    this.editAuthor = book.author;
  }

  saveEdit(id: number) {
<<<<<<< HEAD
    // You'd usually call an API here
=======
>>>>>>> be4d3bb19e94d7b0683149a2de55657b6d482512
    const book = this.books.find(b => b.id === id);
    if (book) {
      book.title = this.editTitle;
      book.author = this.editAuthor;
<<<<<<< HEAD
    }
    this.cancelEdit();
=======
      this.cancelEdit();
    }
>>>>>>> be4d3bb19e94d7b0683149a2de55657b6d482512
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
