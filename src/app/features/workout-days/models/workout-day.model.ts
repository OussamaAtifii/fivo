export interface WorkoutDay {
  id: string;
  user_id: string;
  date: Date;
  type: WorkoutDayType;
  created_at: Date;
}

export type WorkoutDayType = 'workout' | 'joker';
