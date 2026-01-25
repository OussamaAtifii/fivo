import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { WorkoutDayType } from '@features/workout-days/models/workout-day.model';
import { WorkoutDaysStore } from '@features/workout-days/services/workout-days-store';
import { HotToastService } from '@ngxpert/hot-toast';
import { Dialog } from '@shared/components/dialog/dialog';
import { CircleCheckIcon } from '@shared/icons/circle-check-icon/circle-check-icon';
import { JokerIcon } from '@shared/icons/joker-icon/joker-icon';
import { Button } from '@shared/components/button/button';
import { HelperText } from '@shared/components/helper-text/helper-text';

@Component({
  selector: 'app-log-workout-day-dialog',
  imports: [DatePipe, Dialog, CircleCheckIcon, JokerIcon, Button, HelperText],
  templateUrl: './log-workout-day-dialog.html',
})
export class LogWorkoutDayDialog {
  protected readonly workoutDaysStore = inject(WorkoutDaysStore);
  private readonly toastService = inject(HotToastService);

  @ViewChild(Dialog) dialog?: Dialog;
  today = signal<Date>(new Date());

  async markDayAsWorkout(type: WorkoutDayType) {
    await this.workoutDaysStore.toggleWorkoutForDate(this.today(), type);

    if (this.workoutDaysStore.error()) {
      this.toastService.error('Error al marcar el día de entreno', {
        duration: 3000,
      });
      return;
    }

    this.toastService.success('Día de entreno marcado con éxito', {
      duration: 3000,
    });

    this.dialog?.close();
  }

  open() {
    this.dialog?.open();
  }
}
