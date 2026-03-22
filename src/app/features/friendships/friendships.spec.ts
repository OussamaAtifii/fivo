import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Friendships } from './friendships';

describe('Friendships', () => {
  let component: Friendships;
  let fixture: ComponentFixture<Friendships>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Friendships]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Friendships);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
