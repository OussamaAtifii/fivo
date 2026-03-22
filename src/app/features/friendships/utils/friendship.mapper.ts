import { Friendship } from '../models/friendship.model';

export function mapFriendship(friendshipRow: any): Friendship {
  return {
    id: friendshipRow.id,
    userId: friendshipRow.user_id,
    friendId: friendshipRow.friend_id,
    username: friendshipRow.profiles?.username,
    avatar: friendshipRow.profiles?.avatar_url,
    status: friendshipRow.status,
    createdAt: friendshipRow.created_at,
  };
}
