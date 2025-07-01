import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentDetailViewComponent } from './employment-detail-view.component';

describe('EmploymentDetailViewComponent', () => {
  let component: EmploymentDetailViewComponent;
  let fixture: ComponentFixture<EmploymentDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmploymentDetailViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmploymentDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
