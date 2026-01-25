import { TestBed } from '@angular/core/testing';

import { WorkoutDaysApi } from './workout-days-api';

describe('WorkoutDaysApi', () => {
  let service: WorkoutDaysApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutDaysApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
