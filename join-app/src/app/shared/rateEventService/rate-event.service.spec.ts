import { TestBed } from '@angular/core/testing';

import { RateEventService } from './rate-event.service';

describe('RateEventService', () => {
  let service: RateEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RateEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
