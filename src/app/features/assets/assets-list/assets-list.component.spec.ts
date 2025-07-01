import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsListComponent } from './assets-list.component';

describe('AssetsListComponent', () => {
  let component: AssetsListComponent;
  let fixture: ComponentFixture<AssetsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
