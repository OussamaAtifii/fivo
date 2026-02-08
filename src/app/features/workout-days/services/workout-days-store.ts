import { computed, inject, Injectable, signal } from '@angular/core';
import { WorkoutDaysApi } from './workout-days-api';
import { WorkoutDaysState } from '../models/workout-days-state.model';
import { WorkoutDayType } from '../models/workout-day.model';
import { DateService } from '@shared/services/date-service';

@Injectable({
  providedIn: 'root',
})
export class WorkoutDaysStore {
  private readonly workoutDaysApi = inject(WorkoutDaysApi);
  private readonly dateService = inject(DateService);

  private readonly state = signal<WorkoutDaysState>({
    data: [],
    loading: false,
    error: null,
  });

  private readonly weekStart = signal(this.dateService.getMonday(new Date()));

  data = computed(() => this.state().data);
  loading = computed(() => this.state().loading);
  error = computed(() => this.state().error);

  currentWeek = computed(() => this.dateService.buildWeekFrom(this.weekStart()));
  targetDays = signal<number>(5);

  hasJokerDayInWeek = computed(() => {
    const data = this.data();
    return data ? data.some((day) => day.type === 'joker') : false;
  });

  completedWorkoutDaysCount = computed(() => {
    return this.data().filter((workoutDay) => workoutDay.type === 'workout').length;
  });

  daysLeft = computed(() => {
    const targetDays: number = 5;
    const daysLeft = Math.max(targetDays - this.completedWorkoutDaysCount(), 0);
    const daysMap: Record<number, string> = {
      0: '0',
      1: 'One',
      2: 'Two',
      3: 'Three',
      4: 'Four',
      5: 'Five',
      6: 'Six',
      7: 'Seven',
    };

    return daysMap[daysLeft];
  });

  canFinishTarget = computed(() => {
    const targetDays: number = 5;
    const daysLeft = targetDays - 4;
    const today = new Date().getDay();
    const remainingDaysInWeek = 7 - today;
    const daysIncludingToday = remainingDaysInWeek === 7 ? 1 : remainingDaysInWeek;

    if (targetDays === this.completedWorkoutDaysCount()) return true;

    return daysLeft < daysIncludingToday && !this.hasWorkoutForDate(new Date());
  });

  goalMessage = computed(() => {
    const targetDays: number = 5;

    if (targetDays === this.completedWorkoutDaysCount())
      return 'Congratulations! You’ve hit your target 🎉';

    return this.canFinishTarget()
      ? `${this.daysLeft()} more sessions to hit your goal!`
      : 'Goal missed, try again next week! 💪';
  });

  async loadWorkoutDays() {
    this.setLoading();

    const { from, to } = this.dateService.getFromAndToOfWeek(this.weekStart());
    const { workoutDays, error } = await this.workoutDaysApi.getByCurrentWeek(from, to);

    if (error) {
      this.setError('Error a la hora de obtener los días de entreno');
      return;
    }

    this.setData(workoutDays ?? []);
  }

  async toggleWorkoutForDate(date: Date, type: WorkoutDayType) {
    // Prevent mark future dates as workout days
    if (date > new Date()) return;

    this.setLoading();

    const { data: createdDay, error } = await this.workoutDaysApi.toggleWorkoutForDate(date, type);

    if (error) {
      this.setError('Error a la hora de marcar el día de entreno');
      return;
    }

    // TODO: Filter if the day already exists and update instead of adding a new one
    this.setData([...this.data(), createdDay!]);
  }

  hasWorkoutForDate(date: Date): boolean {
    const data = this.data();
    return data.some((workoutDay) => this.dateService.sameDate(workoutDay.date, date));
  }

  hasJokerDayForDate(date: Date): boolean {
    const data = this.data();
    return data.some(
      (workoutDay) =>
        workoutDay.type === 'joker' && this.dateService.sameDate(workoutDay.date, date),
    );
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

  private setData(data: WorkoutDaysState['data']) {
    this.state.update((s) => ({
      ...s,
      loading: false,
      error: null,
      data,
    }));
  }
}
