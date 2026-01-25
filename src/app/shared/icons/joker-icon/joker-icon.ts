import { Component, input } from '@angular/core';

@Component({
  selector: 'app-joker-icon',
  imports: [],
  templateUrl: './joker-icon.html',
})
export class JokerIcon {
  class = input<string>('size-5');
}
