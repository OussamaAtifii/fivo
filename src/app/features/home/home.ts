import { Component } from '@angular/core';
import { WorkoutDays } from '@features/workout-days/workout-days';
import { FriendCard } from '@features/friendships/components/friend-card/friend-card';
import { Friendships } from '@features/friendships/friendships';

@Component({
  selector: 'app-home',
  imports: [WorkoutDays, Friendships],
  templateUrl: './home.html',
})
export default class Home {}
