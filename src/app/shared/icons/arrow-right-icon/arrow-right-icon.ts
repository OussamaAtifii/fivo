import { Component, input } from '@angular/core';

@Component({
  selector: 'app-arrow-right-icon',
  imports: [],
  templateUrl: './arrow-right-icon.html',
})
export class ArrowRightIcon {
  class = input<string>('size-5');
}
