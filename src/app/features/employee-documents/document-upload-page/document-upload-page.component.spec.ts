import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentUploadPageComponent } from './document-upload-page.component';

describe('DocumentUploadPageComponent', () => {
  let component: DocumentUploadPageComponent;
  let fixture: ComponentFixture<DocumentUploadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentUploadPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentUploadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
