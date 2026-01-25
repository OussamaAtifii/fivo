import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.publicSupabaseUrl, environment.publicSupabaseAnonKey);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
}
