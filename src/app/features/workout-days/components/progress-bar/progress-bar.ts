import { Component, computed, inject, input, signal } from '@angular/core';
import { WorkoutDaysStore } from '@features/workout-days/services/workout-days-store';

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.html',
})
export class ProgressBar {
  protected readonly workoutDaysStore = inject(WorkoutDaysStore);

  progressPercentage = input.required<number>();
}
