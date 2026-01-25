import { Component, inject } from '@angular/core';
import { AuthStore } from '@core/auth/services/auth-store';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.html',
})
export class Avatar {
  protected authStore = inject(AuthStore);
}
