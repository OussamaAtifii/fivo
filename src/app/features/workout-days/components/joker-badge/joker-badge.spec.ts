import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokerBadge } from './joker-badge';

describe('JokerBadge', () => {
  let component: JokerBadge;
  let fixture: ComponentFixture<JokerBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokerBadge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokerBadge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
