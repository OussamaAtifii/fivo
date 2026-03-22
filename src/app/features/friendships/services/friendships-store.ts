import { computed, inject, Injectable, signal } from '@angular/core';
import { WorkoutDaysApi } from '@features/workout-days/services/workout-days-api';
import { DateService } from '@shared/services/date-service';
import { WorkoutDaysState } from '@features/workout-days/models/workout-days-state.model';
import { FriendshipsApi } from '@features/friendships/services/friendships-api';
import { FriendShipsState } from '@features/friendships/models/friendships-state.model';
import { AuthStore } from '@core/auth/services/auth-store';
import { FriendWorkouts } from '../models/friendship.model';

@Injectable({
  providedIn: 'root',
})
export class FriendshipsStore {
  private readonly friendShipsApi = inject(FriendshipsApi);
  private readonly authStore = inject(AuthStore);

  private readonly state = signal<FriendShipsState>({
    data: [],
    loading: false,
    error: null,
  });

  data = computed(() => this.state().data);
  loading = computed(() => this.state().loading);
  error = computed(() => this.state().error);

  async getFriendsWorkout() {
    this.setLoading();

    const userId = this.authStore.userId();

    if (!userId) {
      this.setData([]);
      return;
    }

    const { friends, error } = await this.friendShipsApi.getUserFriends(userId);

    const friendIds: string[] = friends.map((row) =>
      row.userId === userId ? row.friendId : row.userId,
    );

    const friendsMap = new Map(friends.map((f) => [f.friendId, f]));

    const { workouts } = await this.friendShipsApi.getFriendsWorkout(friendIds);

    const filteredWorkouts: FriendWorkouts[] = friendIds.map((friendId) => ({
      friendId,
      workoutsThisWeek: workouts.filter((w) => w.user_id === friendId).length,
      username: friendsMap.get(friendId)?.username ?? '',
      avatar: friendsMap.get(friendId)?.avatar,
    }));

    if (error) {
      this.setError('Error a la hora de obtener los amigos del usuario');
      return;
    }

    this.setData(filteredWorkouts ?? []);
  }

  private setLoading() {
    this.state.update((s) => ({
      ...s,
      loading: true,
      error: null,
    }));
  }

  private setError(message: string) {
    this.state.update((s) => ({
      ...s,
      loading: false,
      error: message,
    }));
  }

  private setData(data: FriendShipsState['data']) {
    this.state.update((s) => ({
      ...s,
      loading: false,
      error: null,
      data,
    }));
  }
}
