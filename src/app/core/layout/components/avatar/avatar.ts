import { Component, computed, inject, input } from '@angular/core';
import { AuthStore } from '@core/auth/services/auth-store';
import { getInitials } from '@shared/utils/get-initials';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.html',
})
export class Avatar {
  protected authStore = inject(AuthStore);

  username = input<string>();

  initials = computed(() => getInitials(this.username() || this.authStore.userInitials()));
}
