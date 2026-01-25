import { Component, computed, inject } from '@angular/core';
import { WorkoutDayCard } from '../workout-day-card/workout-day-card';
import { WorkoutDaysStore } from '@features/workout-days/services/workout-days-store';
import { WeekCalendarSkeleton } from '../week-calendar-skeleton/week-calendar-skeleton';

@Component({
  selector: 'app-week-calendar',
  imports: [WorkoutDayCard, WeekCalendarSkeleton],
  templateUrl: './week-calendar.html',
})
export class WeekCalendar {
  protected readonly workoutDaysStore = inject(WorkoutDaysStore);

  // Gets the start and end dates of the current week for display
  weekStartEnd = computed<string>(() => {
    const currentWeek = this.workoutDaysStore.currentWeek();

    const startDate = currentWeek[0]?.getDate();
    const endDate = currentWeek[currentWeek.length - 1]?.getDate();

    return `${startDate}-${endDate}`;
  });
}
