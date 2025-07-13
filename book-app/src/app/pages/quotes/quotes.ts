import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class Quotes {
  quotes: string[] = [
    'People rarely succeed unless they have fun in what they are doing. – Dale Carnegie'
  ];

  editingIndex: number | null = null;
  editedQuote: string = '';

  editQuote(index: number): void {
    this.editingIndex = index;
    this.editedQuote = this.quotes[index];
  }

  saveEditedQuote(): void {
    if (this.editingIndex !== null) {
      this.quotes[this.editingIndex] = this.editedQuote.trim();
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.editingIndex = null;
    this.editedQuote = '';
  }

  addQuote(): void {
    const trimmed = this.editedQuote.trim();
    if (trimmed) {
      this.quotes.push(trimmed);
      this.editedQuote = '';
    }
  }
}

