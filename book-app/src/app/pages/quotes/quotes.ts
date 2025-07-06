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
    'People rarely succeed unless they have fun in what they are doing.',
    '— Dale Carnegie',
  ];
}
