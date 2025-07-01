import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalSettlementPageComponent } from './final-settlement-page.component';

describe('FinalSettlementPageComponent', () => {
  let component: FinalSettlementPageComponent;
  let fixture: ComponentFixture<FinalSettlementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalSettlementPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinalSettlementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
