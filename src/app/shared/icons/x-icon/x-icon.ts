import { Component, input } from '@angular/core';

@Component({
  selector: 'app-x-icon',
  imports: [],
  templateUrl: './x-icon.html',
})
export class XIcon {
  class = input<string>('size-5');
}
