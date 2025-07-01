import { TestBed } from '@angular/core/testing';

import { EmploymentDetailService } from './employment-detail.service';

describe('EmploymentDetailService', () => {
  let service: EmploymentDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmploymentDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
