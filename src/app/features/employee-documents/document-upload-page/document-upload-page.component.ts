import { Component, OnInit } from '@angular/core'; 
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/models/employee.model'; 
import { DocumentUploadComponent } from '../document-upload/document-upload.component';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import {  DocumentListComponent } from '../document-list/document-list.component';
 
@Component({
  selector: 'app-document-upload-page',
  standalone: true,
  imports: [MATERIAL_UI_MODULES, DocumentUploadComponent, DocumentListComponent],
  templateUrl: './document-upload-page.component.html'
})
export class DocumentUploadPageComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployeeId?: number; 
  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getAll().subscribe(data => (this.employees = data));
  }

  onEmployeeSelect(event: any) {
    this.selectedEmployeeId = event.options[0]?.value;
  }

  onUploadDone() {
    // Optionally refresh UI or show success notification
    console.log('Upload completed');
  }
}
