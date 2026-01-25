import { Component, input } from '@angular/core';

@Component({
  selector: 'app-at-icon',
  imports: [],
  templateUrl: './at-icon.html',
})
export class AtIcon {
  class = input<string>('size-5');
}
