import { TestBed } from '@angular/core/testing';

import { IncrementHistoryService } from './increment-history.service';

describe('IncrementHistoryService', () => {
  let service: IncrementHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncrementHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
