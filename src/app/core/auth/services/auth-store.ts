import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { AuthApi } from './auth-api';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly authApi = inject(AuthApi);

  private _user = signal<User | null>(null);

  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => !!this.user());

  userInitials = computed(() => {
    const user = this.user();
    if (!user || !user.email) return '';

    return user.email.slice(0, 2).toUpperCase();
  });

  async signIn({ email, password }: { email: string; password: string }) {
    const { data, error } = await this.authApi.signIn({ email, password });

    if (!error && data?.user) {
      this._user.set(data.user);
    }

    return { data, error };
  }

  async restoreSession() {
    const { data } = await this.authApi.restoreSession();

    if (data?.session?.user) {
      this._user.set(data.session.user);
    }
  }
}
