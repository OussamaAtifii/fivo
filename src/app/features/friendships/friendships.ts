import { Component, inject, OnInit } from '@angular/core';
import { FriendshipsStore } from '@features/friendships/services/friendships-store';
import { FriendCard } from './components/friend-card/friend-card';
import { FriendsSkeleton } from './components/friends-skeleton/friends-skeleton';

@Component({
  selector: 'app-friendships',
  imports: [FriendCard, FriendsSkeleton],
  templateUrl: './friendships.html',
})
export class Friendships implements OnInit {
  friendsStore = inject(FriendshipsStore);

  ngOnInit() {
    this.friendsStore.getFriendsWorkout();
  }
}
