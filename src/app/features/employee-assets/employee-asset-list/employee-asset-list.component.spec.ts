import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssetListComponent } from './employee-asset-list.component';

describe('EmployeeAssetListComponent', () => {
  let component: EmployeeAssetListComponent;
  let fixture: ComponentFixture<EmployeeAssetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAssetListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeAssetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
