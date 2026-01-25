import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '@shared/services/supabase-service';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private readonly supabase = inject(SupabaseService).getClient();

  async signIn({ email, password }: { email: string; password: string }) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  }

  async restoreSession() {
    const { data } = await this.supabase.auth.getSession();
    return { data };
  }
}
