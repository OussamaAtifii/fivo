import { TestBed } from '@angular/core/testing';

import { FriendshipsApi } from './friendships-api';

describe('FriendshipsApi', () => {
  let service: FriendshipsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendshipsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
