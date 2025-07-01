import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GratuityReportComponent } from './gratuity-report.component';

describe('GratuityReportComponent', () => {
  let component: GratuityReportComponent;
  let fixture: ComponentFixture<GratuityReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GratuityReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GratuityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
