export interface FriendWorkouts extends Pick<Friendship, 'username' | 'avatar'> {
  friendId: string;
  workoutsThisWeek: number;
}

export interface Friendship {
  id: string;
  userId: string;
  friendId: string;
  username: string;
  avatar?: string;
  status: FriendShipStatus;
  createdAt: Date;
}

export type FriendShipStatus = 'pending' | 'accepted' | 'declined';
