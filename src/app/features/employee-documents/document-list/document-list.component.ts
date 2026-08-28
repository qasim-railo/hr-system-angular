import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeDocument } from '../../../core/models/employee-document.model';
import { EmployeeDocumentService, FileRecord } from '../../../core/services/employee-document.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ...MATERIAL_UI_MODULES],
  templateUrl: './document-list.component.html'
})
export class DocumentListComponent implements OnInit,OnChanges  {
  
  private documentService = inject(EmployeeDocumentService);

  @Input() employeeId!: number;

  documents: FileRecord[] = [];
  versions: Record<number, FileRecord[]> = {};
  search = '';
  documentType = '';
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
  getFileType(filePath: string): 'image' | 'pdf' | 'other' {
  var extensionx = filePath.split('.').pop()?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif'].includes(extensionx!)) return 'image';
  if (extensionx === 'pdf') return 'pdf';
  return 'other';
}


  loadDocuments() {
    this.documentService.searchFiles({ entityType: 'Employee', entityId: this.employeeId, search: this.search, documentType: this.documentType, status: 'Active' }).subscribe((docs) => {
      this.documents = docs;
    });
  }

  applySearch(): void { this.loadDocuments(); }

  replace(fileId: number, event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.documentService.replaceFile(fileId, file).subscribe(() => this.loadDocuments());
  }

  showVersions(fileId: number): void {
    this.documentService.getVersions(fileId).subscribe(history => this.versions[fileId] = history);
  }

  download(id: number) {
    this.documentService.downloadFile(id).subscribe((blob) => {
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
      this.documentService.deleteFile(id).subscribe(() => {
        this.loadDocuments();
      });
    }
  }
}
