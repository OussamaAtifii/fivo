import { Component, computed, inject, input, ViewChild } from '@angular/core';
import { NgClass } from '@angular/common';
import { WorkoutDaysStore } from '@features/workout-days/services/workout-days-store';
import { CheckIcon } from '@shared/icons/check-icon/check-icon';
import { JokerIcon } from '@shared/icons/joker-icon/joker-icon';
import { Dialog } from '@shared/components/dialog/dialog';
import { DateInfo } from '@shared/models/date-info.model';
import { DateService } from '@shared/services/date-service';
import { XIcon } from '@shared/icons/x-icon/x-icon';

@Component({
  selector: 'app-workout-day-card',
  imports: [NgClass, CheckIcon, JokerIcon, XIcon],
  templateUrl: './workout-day-card.html',
})
export class WorkoutDayCard {
  protected readonly workoutDaysStore = inject(WorkoutDaysStore);
  private readonly dateService = inject(DateService);

  @ViewChild(Dialog) dialog?: Dialog;

  weekDay = input.required<Date>();

  dateInfo = computed<DateInfo>(() => this.dateService.getDateInfo(this.weekDay()));

  // Calculates if the user did workout on the given date
  hasWorkout = computed(() => this.workoutDaysStore.hasWorkoutForDate(this.weekDay()));

  // Calculates if the user has a joker workout day on the given date
  isJokerWorkoutDay = computed(() => this.workoutDaysStore.hasJokerDayForDate(this.weekDay()));

  isDisabled = computed(() => {
    const status = this.dateInfo().status;
    const hasWorkout = this.hasWorkout();

    // Only disable if the day isn't today or already has a workout
    return !(status === 'today' && !hasWorkout);
  });

  isMissingWorkout = computed(() => {
    const status = this.dateInfo().status;
    const hasWorkout = this.hasWorkout();

    return status === 'past' && !hasWorkout;
  });
}
