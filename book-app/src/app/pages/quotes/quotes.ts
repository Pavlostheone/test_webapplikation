import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-quotes',
  templateUrl: './quotes.html',
  imports: [CommonModule],
})
export class Quotes {
  quotes: string[] = [
    'Stay hungry, stay foolish.',
    'Code is like humor. When you have to explain it, it’s bad.',
    'Simplicity is the soul of efficiency.',
    'First, solve the problem. Then, write the code.',
    'Make it work, make it right, make it fast.',
  ];
}
