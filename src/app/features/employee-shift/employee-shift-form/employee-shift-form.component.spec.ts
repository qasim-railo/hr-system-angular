import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeShiftFormComponent } from './employee-shift-form.component';

describe('EmployeeShiftFormComponent', () => {
  let component: EmployeeShiftFormComponent;
  let fixture: ComponentFixture<EmployeeShiftFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeShiftFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeShiftFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
