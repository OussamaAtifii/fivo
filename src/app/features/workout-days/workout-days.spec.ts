import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutDays } from './workout-days';

describe('WorkoutDays', () => {
  let component: WorkoutDays;
  let fixture: ComponentFixture<WorkoutDays>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutDays]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutDays);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
