import { Component, OnInit } from '@angular/core'; 
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/models/employee.model'; 
import { DocumentUploadComponent } from '../document-upload/document-upload.component';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import {  DocumentListComponent } from '../document-list/document-list.component';
import { EmployeeDocumentService, FileRecord } from '../../../core/services/employee-document.service';
 
@Component({
  selector: 'app-document-upload-page',
  standalone: true,
  imports: [MATERIAL_UI_MODULES, DocumentUploadComponent, DocumentListComponent],
  templateUrl: './document-upload-page.component.html'
})
export class DocumentUploadPageComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployeeId?: number; 
  recycleBin: FileRecord[] = [];
  constructor(private employeeService: EmployeeService, private documentService: EmployeeDocumentService) {}

  ngOnInit() {
    this.employeeService.getAll().subscribe(data => (this.employees = data));
    this.loadRecycleBin();
  }

  onEmployeeSelect(event: any) {
    this.selectedEmployeeId = event.options[0]?.value;
  }

  onUploadDone() {
    // Optionally refresh UI or show success notification
    console.log('Upload completed');
  }

  loadRecycleBin(): void {
    this.documentService.getRecycleBin().subscribe(data => this.recycleBin = data);
  }

  restore(fileId: number): void {
    this.documentService.restoreFile(fileId).subscribe(() => this.loadRecycleBin());
  }

  purge(fileId: number): void {
    if (confirm('Permanently delete this file and all of its versions?')) {
      this.documentService.purgeFile(fileId).subscribe(() => this.loadRecycleBin());
    }
  }
}
