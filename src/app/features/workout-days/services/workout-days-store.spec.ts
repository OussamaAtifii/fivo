import { TestBed } from '@angular/core/testing';

import { WorkoutDaysStore } from './workout-days-store';

describe('WorkoutDaysStore', () => {
  let service: WorkoutDaysStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutDaysStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
