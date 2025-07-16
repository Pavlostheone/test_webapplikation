import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quotes',
  standalone: true,
  templateUrl: './quotes.html',
  imports: [CommonModule, FormsModule]
})
export class Quotes implements OnInit {
  quotes: string[] = [];
  editingIndex: number | null = null;
  editedQuote: string = '';
  username: string = '';

  ngOnInit(): void {
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      alert('User not logged in!');
      return;
    }
    this.username = storedUsername;
    this.loadQuotes();
  }

  loadQuotes(): void {
    const stored = localStorage.getItem(`quotes_${this.username}`);
    if (stored) {
      this.quotes = JSON.parse(stored);
    } else {
      this.quotes = [
        'People rarely succeed unless they have fun in what they are doing. – Dale Carnegie',
        'Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill',
        'Don’t watch the clock; do what it does. Keep going. – Sam Levenson',
        'The future depends on what you do today. – Mahatma Gandhi',
        'Everything you’ve ever wanted is on the other side of fear. – George Addair'
      ];
      this.saveQuotesToLocalStorage();
    }
  }

  saveQuotesToLocalStorage(): void {
    localStorage.setItem(`quotes_${this.username}`, JSON.stringify(this.quotes));
  }

  editQuote(index: number): void {
    this.editingIndex = index;
    this.editedQuote = this.quotes[index];
  }

  saveEdit(): void {
    if (this.editingIndex !== null) {
      this.quotes[this.editingIndex] = this.editedQuote.trim();
      this.saveQuotesToLocalStorage();
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
      this.saveQuotesToLocalStorage();
      this.editedQuote = '';
    }
  }

  deleteQuote(index: number): void {
    this.quotes.splice(index, 1);
    this.saveQuotesToLocalStorage();
    if (this.editingIndex === index) {
      this.cancelEdit();
    }
  }
}
