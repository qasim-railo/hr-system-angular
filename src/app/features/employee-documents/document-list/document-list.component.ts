import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDocument } from '../../../core/models/employee-document.model';
import { EmployeeDocumentService } from '../../../core/services/employee-document.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [ 
   MATERIAL_UI_MODULES
  ],
  templateUrl: './document-list.component.html'
})
export class DocumentListComponent implements OnInit,OnChanges  {
  
  private documentService = inject(EmployeeDocumentService);

  @Input() employeeId!: number;

  documents: EmployeeDocument[] = [];
  displayedColumns: string[] = ['fileName', 'fileType', 'uploadedAt', 'actions'];

  ngOnInit(): void {
    if (this.employeeId) {
      this.loadDocuments();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
     if (changes['employeeId'] && changes['employeeId'].currentValue) {
      this.loadDocuments();
    }
  }
  

  loadDocuments() {
    this.documentService.getByEmployeeId(this.employeeId).subscribe((docs) => {
      this.documents = docs;
    });
  }

  download(id: number) {
    this.documentService.download(id).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this document?')) {
      this.documentService.delete(id).subscribe(() => {
        this.loadDocuments();
      });
    }
  }
}
