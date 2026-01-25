import { Component, computed, inject, ViewChild } from '@angular/core';
import { WorkoutDaysStore } from '@features/workout-days/services/workout-days-store';
import { Card } from '@shared/components/card/card';
import { JokerBadge } from '../joker-badge/joker-badge';
import { ProgressBar } from '../progress-bar/progress-bar';
import { CircleCheckIcon } from '@shared/icons/circle-check-icon/circle-check-icon';
import { LogWorkoutDayDialog } from '../log-workout-day-dialog/log-workout-day-dialog';
import { WorkoutSummarySkeleton } from '../workout-summary-skeleton/workout-summary-skeleton';
import { HelperText } from '@shared/components/helper-text/helper-text';
import { HeartCheckIcon } from '@shared/icons/heart-check-icon/heart-check-icon';
import { Button } from '@shared/components/button/button';

@Component({
  selector: 'app-workout-summary',
  imports: [
    Card,
    JokerBadge,
    ProgressBar,
    CircleCheckIcon,
    LogWorkoutDayDialog,
    WorkoutSummarySkeleton,
    HelperText,
    HeartCheckIcon,
    Button,
  ],
  templateUrl: './workout-summary.html',
})
export class WorkoutSummary {
  @ViewChild(LogWorkoutDayDialog) dialog?: LogWorkoutDayDialog;

  protected readonly workoutDaysStore = inject(WorkoutDaysStore);

  progressPercentage = computed(() => {
    const completedDays = this.workoutDaysStore.completedWorkoutDaysCount();
    const targetDays = this.workoutDaysStore.targetDays();

    if (targetDays === 0) return 0;

    const percentage = (completedDays / targetDays) * 100;
    return Math.min(percentage, 100);
  });

  openLogWorkoutDayDialog() {
    this.dialog?.open();
  }

  hasWorkout = computed(() => this.workoutDaysStore.hasWorkoutForDate(new Date()));
}
