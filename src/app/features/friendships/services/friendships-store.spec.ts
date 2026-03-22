import { TestBed } from '@angular/core/testing';

import { FriendshipsStore } from './friendships-store';

describe('FriendshipsStore', () => {
  let service: FriendshipsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendshipsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
