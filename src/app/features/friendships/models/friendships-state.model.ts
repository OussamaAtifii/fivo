import { FriendWorkouts } from '@features/friendships/models/friendship.model';
import { QueryState } from '@shared/models/query-state.model';

export interface FriendShipsState extends QueryState<FriendWorkouts[]> {}
