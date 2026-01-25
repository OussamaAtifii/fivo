import { Component, input } from '@angular/core';

@Component({
  selector: 'app-lock-icon',
  imports: [],
  templateUrl: './lock-icon.html',
})
export class LockIcon {
  class = input<string>('size-5');
}
