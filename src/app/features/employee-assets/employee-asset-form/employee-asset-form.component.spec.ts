import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssetFormComponent } from './employee-asset-form.component';

describe('EmployeeAssetFormComponent', () => {
  let component: EmployeeAssetFormComponent;
  let fixture: ComponentFixture<EmployeeAssetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAssetFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeAssetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
