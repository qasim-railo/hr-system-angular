import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalSettlementGenerateComponent } from './final-settlement-generate.component';

describe('FinalSettlementGenerateComponent', () => {
  let component: FinalSettlementGenerateComponent;
  let fixture: ComponentFixture<FinalSettlementGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalSettlementGenerateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinalSettlementGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
