import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeShiftPageComponent } from './employee-shift-page.component';

describe('EmployeeShiftPageComponent', () => {
  let component: EmployeeShiftPageComponent;
  let fixture: ComponentFixture<EmployeeShiftPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeShiftPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeShiftPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
