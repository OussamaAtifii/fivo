import { QueryState } from '@shared/models/query-state.model';
import { WorkoutDay } from './workout-day.model';

export interface WorkoutDaysState extends QueryState<WorkoutDay[]> {}
