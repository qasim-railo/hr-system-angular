import { TestBed } from '@angular/core/testing';

import { EmployeeShiftService } from './employee-shift.service';

describe('EmployeeShiftService', () => {
  let service: EmployeeShiftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeShiftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
