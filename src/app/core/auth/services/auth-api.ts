import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { Router } from '@angular/router';
import { SupabaseService } from '@shared/services/supabase-service';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private readonly router = inject(Router);
  private readonly supabase = inject(SupabaseService).getClient();

  private user = signal<User | null>(null);

  isAuthenticated = computed(() => !!this.user());

  async signIn({ email, password }: { email: string; password: string }) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.log(error.message);
      return;
    }

    this.user.set(data.user);
    this.router.navigate(['/']);
  }

  async restoreSession() {
    const { data } = await this.supabase.auth.getSession();

    if (data.session?.user) {
      this.user.set(data.session.user);
    }
  }

  getCurrentUser() {
    return this.user();
  }
}
