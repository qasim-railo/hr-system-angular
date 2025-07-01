import { TestBed } from '@angular/core/testing';

import { EmployeeAssetService } from './employee-asset.service';

describe('EmployeeAssetService', () => {
  let service: EmployeeAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
