import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssetPageComponent } from './employee-asset-page.component';

describe('EmployeeAssetPageComponent', () => {
  let component: EmployeeAssetPageComponent;
  let fixture: ComponentFixture<EmployeeAssetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAssetPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeAssetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
