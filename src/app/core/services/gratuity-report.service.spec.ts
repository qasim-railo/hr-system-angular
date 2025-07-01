import { TestBed } from '@angular/core/testing';

import { GratuityReportService } from './gratuity-report.service';

describe('GratuityReportService', () => {
  let service: GratuityReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GratuityReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
