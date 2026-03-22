import { inject, Injectable } from '@angular/core';
import { DateService } from '@shared/services/date-service';
import { SupabaseService } from '@shared/services/supabase-service';
import { mapFriendship } from '../utils/friendship.mapper';

@Injectable({
  providedIn: 'root',
})
export class FriendshipsApi {
  private supabase = inject(SupabaseService).getClient();
  private dateService = inject(DateService);

  async getUserFriends(userId: string) {
    const { data: friends, error } = await this.supabase
      .from('friendships')
      .select(
        `
          *,
          requester:profiles!user_id (username, avatar_url),
          recipient:profiles!friend_id (username, avatar_url)
        `,
      )
      .eq('status', 'accepted');

    return { friends: friends?.map((friend) => mapFriendship(friend, userId)) ?? [], error };
  }

  async getFriendsWorkout(friendIds: string[]) {
    if (!friendIds.length) return { workouts: [] };

    const monday = this.dateService.getMonday(new Date());
    const { from, to } = this.dateService.getFromAndToOfWeek(monday);

    const { data: workouts } = await this.supabase
      .from('days')
      .select('*')
      .in('user_id', friendIds)
      .eq('type', 'workout')
      .gte('date', this.dateService.formatDateToYYYYMMDD(from))
      .lte('date', this.dateService.formatDateToYYYYMMDD(to));

    return { workouts: workouts ?? [] };
  }
}
