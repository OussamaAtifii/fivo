import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutSummary } from './workout-summary';
import { WorkoutDaysStore } from '@features/workout-days/services/workout-days-store';
import { signal } from '@angular/core';

const loadingSignal = signal(false);

const workoutDayStoreMock = {
  loading: signal(false),
  completedWorkoutDaysCount: signal(2),
  targetDays: signal(5),
  hasJokerDayInWeek: signal(false),
  todayHasWorkout: signal(false),
  hasWorkoutForDate: vi.fn(() => true),
  goalMessage: signal("Congratulations! You've hit your target 🎉"),
};

describe('WorkoutSummary', () => {
  let component: WorkoutSummary;
  let fixture: ComponentFixture<WorkoutSummary>;

  beforeEach(async () => {
    // Reset store state before each test
    workoutDayStoreMock.loading.set(false);
    workoutDayStoreMock.targetDays.set(5);
    workoutDayStoreMock.hasJokerDayInWeek.set(false);

    await TestBed.configureTestingModule({
      imports: [WorkoutSummary],
      providers: [
        {
          provide: WorkoutDaysStore,
          useValue: workoutDayStoreMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutSummary);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show skeleton when loading', () => {
    workoutDayStoreMock.loading.set(true);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as Element;
    const skeleton = compiled.querySelector('app-workout-summary-skeleton');

    expect(skeleton).toBeTruthy();
  });

  it('should show completed days', () => {
    workoutDayStoreMock.completedWorkoutDaysCount.set(3);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as Element;
    const completedWorkoutDays = compiled.querySelector('[data-testid="completed-workout-days"]');

    expect(completedWorkoutDays).toBeTruthy();
    expect(completedWorkoutDays?.textContent?.trim()).toBe('3');
  });

  it('should show target days', () => {
    workoutDayStoreMock.targetDays.set(6);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as Element;
    const targetDays = compiled.querySelector('[data-testid="target-days"]');

    expect(targetDays).toBeTruthy();
    expect(targetDays?.textContent?.trim()).toBe('6 days');
  });

  it("should display the “workout logged” message when the user completes today's workout.", () => {
    workoutDayStoreMock.todayHasWorkout.set(true);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as Element;
    const completeWorkoutBtn = compiled.querySelector('[data-testid="workout-logged-message"]');

    expect(completeWorkoutBtn?.textContent?.trim()).toBe(
      "Today's workout has been logged. Great job! 🎉",
    );
  });

  // Joker tests
  it('should show joker badge if there is a joker day in the week', () => {
    workoutDayStoreMock.hasJokerDayInWeek.set(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as Element;
    const jokerBadge = compiled.querySelector('[data-testid="joker-badge"]');

    expect(jokerBadge).toBeTruthy();
  });
});
