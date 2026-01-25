import { Component, input } from '@angular/core';

@Component({
  selector: 'app-heart-check-icon',
  imports: [],
  templateUrl: './heart-check-icon.html',
})
export class HeartCheckIcon {
  class = input<string>('size-5');
}
