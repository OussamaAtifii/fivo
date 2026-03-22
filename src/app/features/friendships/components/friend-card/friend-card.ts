import { Component, input } from '@angular/core';
import { FriendWorkouts } from '@features/friendships/models/friendship.model';
import { Card } from '@shared/components/card/card';
import { Avatar } from '@core/layout/components/avatar/avatar';

@Component({
  selector: 'app-friend-card',
  imports: [Card, Avatar],
  templateUrl: './friend-card.html',
})
export class FriendCard {
  friendWorkout = input.required<FriendWorkouts>();
}
