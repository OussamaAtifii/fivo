import { Component, ElementRef, input, ViewChild } from '@angular/core';
import { XIcon } from '@shared/icons/x-icon/x-icon';

@Component({
  selector: 'app-dialog',
  imports: [XIcon],
  templateUrl: './dialog.html',
})
export class Dialog {
  @ViewChild('dialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;

  title = input<string>();

  open() {
    this.dialog.nativeElement.showModal();
  }

  close() {
    this.dialog.nativeElement.close();
  }
}
