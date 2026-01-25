import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutDayCard } from './workout-day-card';

describe('WorkoutDayCard', () => {
  let component: WorkoutDayCard;
  let fixture: ComponentFixture<WorkoutDayCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutDayCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutDayCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
