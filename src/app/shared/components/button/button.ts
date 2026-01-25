import { NgClass } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

type ButtonVariant = 'primary' | 'joker' | 'secondary';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.html',
})
export class Button {
  variant = input<ButtonVariant>('primary');
  disabled = input<boolean>(false);

  clicked = output<void>();

  variants: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-white focus:ring-primary',
    joker: 'bg-joker-500 text-joker-text focus:ring-joker-500',
    secondary: 'bg-secondary text-white focus:ring-secondary',
  };

  varianClasses = computed(() => this.variants[this.variant()]);
}
