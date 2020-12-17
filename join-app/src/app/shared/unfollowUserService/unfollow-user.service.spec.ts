import { TestBed } from '@angular/core/testing';

import { UnfollowUserService } from './unfollow-user.service';

describe('UnfollowUserService', () => {
  let service: UnfollowUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnfollowUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
