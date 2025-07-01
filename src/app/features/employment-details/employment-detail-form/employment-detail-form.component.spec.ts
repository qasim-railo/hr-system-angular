import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentDetailFormComponent } from './employment-detail-form.component';

describe('EmploymentDetailFormComponent', () => {
  let component: EmploymentDetailFormComponent;
  let fixture: ComponentFixture<EmploymentDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmploymentDetailFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmploymentDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
