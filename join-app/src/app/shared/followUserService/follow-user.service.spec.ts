import { TestBed } from '@angular/core/testing';

import { FollowUserService } from './follow-user.service';

describe('FollowUserService', () => {
  let service: FollowUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
