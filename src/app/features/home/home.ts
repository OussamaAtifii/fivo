import { Component } from '@angular/core';
import { WorkoutDays } from '@features/workout-days/workout-days';

@Component({
  selector: 'app-home',
  imports: [WorkoutDays],
  templateUrl: './home.html',
})
export default class Home {}
