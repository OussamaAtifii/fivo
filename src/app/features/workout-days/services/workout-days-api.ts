import { inject, Injectable } from '@angular/core';
import { PostgrestError } from '@supabase/supabase-js';
import { WorkoutDay, WorkoutDayType } from '../models/workout-day.model';
import { AuthApi } from '@core/auth/services/auth-api';
import { DateService } from '@shared/services/date-service';
import { SupabaseService } from '@shared/services/supabase-service';

@Injectable({
  providedIn: 'root',
})
export class WorkoutDaysApi {
  private authApi = inject(AuthApi);
  private dateService = inject(DateService);
  private supabase = inject(SupabaseService).getClient();

  async getByCurrentWeek(
    from: Date,
    to: Date,
  ): Promise<{
    workoutDays: WorkoutDay[];
    error: PostgrestError | null;
  }> {
    const { data: workoutDays, error } = await this.supabase
      .from('days')
      .select()
      .gte('date', this.dateService.formatDateToYYYYMMDD(from))
      .lte('date', this.dateService.formatDateToYYYYMMDD(to));

    return { workoutDays: workoutDays ?? [], error };
  }

  async toggleWorkoutForDate(date: Date, type: WorkoutDayType) {
    const userId = this.authApi.getCurrentUser()?.id;
    const formattedDate = this.dateService.formatDateToYYYYMMDD(date);

    const { data, error } = await this.supabase
      .from('days')
      .insert({ user_id: userId, date: formattedDate, type })
      .select()
      .single();

    return { data, error };
  }
}
