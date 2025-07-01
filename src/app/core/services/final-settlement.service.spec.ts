import { TestBed } from '@angular/core/testing';

import { FinalSettlementService } from './final-settlement.service';

describe('FinalSettlementService', () => {
  let service: FinalSettlementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinalSettlementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
