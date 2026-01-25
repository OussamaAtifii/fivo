import { Component, input } from '@angular/core';

@Component({
  selector: 'app-check-icon',
  imports: [],
  templateUrl: './check-icon.html',
})
export class CheckIcon {
  class = input<string>('size-5');
}
