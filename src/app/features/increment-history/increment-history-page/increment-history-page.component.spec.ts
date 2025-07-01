import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrementHistoryPageComponent } from './increment-history-page.component';

describe('IncrementHistoryPageComponent', () => {
  let component: IncrementHistoryPageComponent;
  let fixture: ComponentFixture<IncrementHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncrementHistoryPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncrementHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
