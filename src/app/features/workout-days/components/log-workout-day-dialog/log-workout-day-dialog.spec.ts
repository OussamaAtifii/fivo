import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogWorkoutDayDialog } from './log-workout-day-dialog';

describe('LogWorkoutDayDialog', () => {
  let component: LogWorkoutDayDialog;
  let fixture: ComponentFixture<LogWorkoutDayDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogWorkoutDayDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogWorkoutDayDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
