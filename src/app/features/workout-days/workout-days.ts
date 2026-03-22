import { Component, inject, OnInit } from '@angular/core';
import { WorkoutDaysStore } from './services/workout-days-store';
import { WorkoutSummary } from './components/workout-summary/workout-summary';
import { WeekCalendar } from './components/week-calendar/week-calendar';

@Component({
  selector: 'app-workout-days',
  imports: [WorkoutSummary, WeekCalendar],
  templateUrl: './workout-days.html',
})
export class WorkoutDays implements  OnInit {
  protected readonly workoutDaysStore = inject(WorkoutDaysStore);

  ngOnInit(): void {
    this.workoutDaysStore.loadWorkoutDays();
  }
}
