import { Friendship } from '../models/friendship.model';

export function mapFriendship(friendshipRow: any, userId: string): Friendship {
  const iAmRequester = friendshipRow.user_id === userId;
  const friendProfile = iAmRequester ? friendshipRow.recipient : friendshipRow.requester;
  const friendId = iAmRequester ? friendshipRow.friend_id : friendshipRow.user_id;

  return {
    id: friendshipRow.id,
    userId: friendshipRow.user_id,
    friendId: friendId,
    username: friendProfile?.username,
    avatar: friendProfile?.avatar_url,
    status: friendshipRow.status,
    createdAt: friendshipRow.created_at,
  };
}
