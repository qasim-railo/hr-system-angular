import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalSettlementListComponent } from './final-settlement-list.component';

describe('FinalSettlementListComponent', () => {
  let component: FinalSettlementListComponent;
  let fixture: ComponentFixture<FinalSettlementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalSettlementListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinalSettlementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
